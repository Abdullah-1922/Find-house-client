/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import Image from "next/image";
import cloud from "@/../../public/assets/icon/314828_cloud_upload_icon.svg";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import PreviewImage from "@/components/ui/previewImage";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/features/product/productApi";
import { TProduct } from "@/types";
import Spinner from "@/components/ui/spinner";

const productSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(1, "Product name is required"),
  category: z
    .string({ required_error: "Product category is required" })
    .min(1, "Product category is required"),
  description: z
    .string({ required_error: "Product description is required" })
    .min(1, "Product description is required"),
  price: z
    .string({ required_error: "Price is required" })
    .min(1, "Price is required"),
});

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [images, setImages] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imagesError, setImagesError] = useState(false);
  const { data, isFetching } = useGetSingleProductQuery(params?.id);
  const product = data?.data as TProduct;
  const form = useForm<TProduct>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product?.name,
        category: product?.category,
        description: product?.description,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        price: product?.price.toString(),
      });
    }
    setImages(product?.images || []);
  }, [product, form]);

  // upload media
  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    resourceType: "image" | "video",
    setLoading: Dispatch<SetStateAction<boolean>>,
    setUrl: Dispatch<SetStateAction<string[]>>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const secureUrl = await uploadToCloudinary(file, resourceType);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setUrl((prev) => [...prev, secureUrl]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: TProduct) {
    setImagesError(images.length === 0);
    const loadingToast = toast.loading("Product updating...");
    values.images = images;
    values.price = Number(values.price);

    const res = await updateProduct({ body: values, id: params?.id });
    if (res?.data?.success) {
      toast.success("Product Updated Successfully", {
        id: loadingToast,
      });
    } else {
      toast.error("Failed to update product", {
        id: loadingToast,
      });
    }
  }

  if (isFetching) return <Spinner className="h-[600px]" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-10">
        <div className="space-y-8">
          {/* Property Description And Price */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-[#24324A] my-5">
                Edit Product
              </h2>
              <div className="space-y-4">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={product.category}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="chair">Chair</SelectItem>
                              <SelectItem value="table">Table</SelectItem>
                              <SelectItem value="sofa">Sofa</SelectItem>
                              <SelectItem value="bed">Bed</SelectItem>
                              <SelectItem value="cloth">Cloth</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="USD" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="Describe about your product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full mt-6">
                <Card className="pt-6">
                  <p className={`mb-2 pl-6 ${imagesError && "text-red-600"}`}>
                    Upload Images
                  </p>
                  <CardContent>
                    <label
                      htmlFor="dropzone-file"
                      className="border-4 block border-dashed rounded-lg p-8 text-center mx-auto cursor-pointer"
                    >
                      <Image
                        className="mx-auto"
                        src={cloud}
                        alt="cloud_upload"
                        width={60}
                        height={40}
                      />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Click Here Or Drop Files To Upload
                      </p>
                    </label>
                    <input
                      onChange={(e) =>
                        handleUpload(e, "image", setImageUploading, setImages)
                      }
                      type="file"
                      id="dropzone-file"
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.webp"
                    />
                    <div className="flex gap-4 pt-5 flex-wrap">
                      {images.map((image) => (
                        <PreviewImage
                          setImages={setImages}
                          key={image}
                          image={image}
                        />
                      ))}
                      {imageUploading && (
                        <div className="w-[260px] h-[150px] rounded-lg bg-black/50 flex items-center justify-center">
                          <Loader
                            className="animate-spin text-white/90"
                            size={30}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <div className="mt-2">
                  {imageUploading && (
                    <p className="text-gray-600">Image is uploading...</p>
                  )}
                  {imagesError && (
                    <p className="text-red-600">Upload at leas one image</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-900"
        >
          {isLoading ? (
            <div>
              <div className="flex items-center gap-2">
                <span>Adding...</span>{" "}
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              </div>
            </div>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
  );
}
