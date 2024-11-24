/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import cloud from "../../../../../../../public/assets/icon/314828_cloud_upload_icon.svg";
import { useCreatePropertyMutation } from "@/redux/api/features/property/propertyApi";
import { Loader } from "lucide-react";
import { toast, Toaster } from "sonner";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import PreviewImage from "@/components/ui/previewImage";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import PreviewVideo from "@/components/ui/previewVideo";
import { useUser } from "@/hooks/user.hook";

const propertySchema = z.object({
  title: z
    .string({ required_error: "Property title is required" })
    .min(1, "Property title is required"),
  category: z
    .string({ required_error: "Property title is required" })
    .min(1, "Property title is required"),
  description: z
    .string({ required_error: "Property description is required" })
    .min(1, "Property description is required"),
  status: z
    .string({ required_error: "Status is required" })
    .min(1, "Status is required"),
  type: z
    .string({ required_error: "Type is required" })
    .min(1, "Type is required"),
  rooms: z
    .string({ required_error: "Rooms are required" })
    .min(1, "Rooms are required"),
  price: z
    .string({ required_error: "Price is required" })
    .min(1, "Price is required"),
  area: z
    .string({ required_error: "Area is required" })
    .min(1, "Area is required"),
  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address is required"),
  city: z
    .string({ required_error: "City is required" })
    .min(1, "City is required"),
  state: z
    .string({ required_error: "State is required" })
    .min(1, "State is required"),
  country: z
    .string({ required_error: "Country is required" })
    .min(1, "Country is required"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  age: z.string().optional(),
  bathrooms: z.string().optional(),
  features: z.array(z.string()).optional(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(1, "Phone number is required"),
});

const features = [
  "Air Conditioning",
  "Swimming Pool",
  "Central Heating",
  "Laundry Room",
  "Gym",
  "Alarm",
  "Window Covering",
  "Refrigerator",
  "TV Cable & WiFi",
  "Microwave",
] as const;

export default function AddProperties() {
  const [addProperty, { isLoading }] = useCreatePropertyMutation();
  const [images, setImages] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [floorImages, setFloorImages] = useState<string[]>([]);
  const [floorImageUploading, setFloorImageUploading] =
    useState<boolean>(false);
  const [videoUploading, setVideoUploading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string[]>([]);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      features: [],
    },
  });

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

      if (resourceType === "video") {
        toast.success("Video uploaded successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof propertySchema>) {
    const {
      address,
      city,
      state,
      country,
      latitude,
      longitude,
      age,
      rooms,
      bathrooms,
      price,
      area,

      ...resValues
    } = values;

    const formdata = {
      author: "673704d3db3cdc44c18d7b6b",
      images,
      floorPlanImage: floorImages,
      videoUrl,
      price: Number(price),
      area: Number(area),
      location: {
        address,
        city,
        state,
        country,
        latitude,
        longitude,
      },
      extraInfo: {
        age,
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
      },
      contactInfo: {
        name: "user name",
        userName: "johndoe123",
        phone: "+1 123 456 7890",
        email: "johndoe@example.com",
      },
      ...resValues,
    };
    const res = await addProperty(formdata);
    console.log("res", res);
    const loadingToast = toast.loading("property adding...");
    if (res?.data?.success) {
      toast.success("Property Added Successfully", {
        id: loadingToast,
      });
    } else {
      toast.error("Failed to add property", {
        id: loadingToast,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-10">
        <div className="space-y-8">
          {/* Property Description And Price */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-[#24324A] my-5">
                Property Description And Price
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-7">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your property title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="rent">Rent</SelectItem>
                              <SelectItem value="sell">Sell</SelectItem>
                            </SelectContent>
                          </Select>
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
                      <FormLabel>Property Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="Describe about your property"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="non-active">
                              Non Active
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rooms</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rooms" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Room" : "Rooms"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Sqft" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Media */}
          <div className="flex xl:flex-row flex-col gap-6">
            <div className="w-full">
              <Card className="pt-6">
                <p className="mb-2 pl-6">Upload Images</p>
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
              </div>
            </div>
            <div className="w-full">
              <Card className="pt-6">
                <p className="mb-2 pl-6">Upload Floor Images</p>
                <CardContent>
                  <label
                    htmlFor="dropzone-floor-images"
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
                      handleUpload(
                        e,
                        "image",
                        setFloorImageUploading,
                        setFloorImages
                      )
                    }
                    type="file"
                    id="dropzone-floor-images"
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.webp"
                  />
                  <div className="flex gap-4 pt-5 flex-wrap">
                    {floorImages.map((image) => (
                      <PreviewImage
                        setImages={setFloorImages}
                        key={image}
                        image={image}
                      />
                    ))}
                    {floorImageUploading && (
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
                {floorImageUploading && (
                  <p className="text-gray-600">Image is uploading...</p>
                )}
              </div>
            </div>
          </div>

          {/* upload video */}
          <div>
            <Card className="pt-6">
              <CardContent>
                <p className="mb-2">Upload A Video</p>
                <label
                  htmlFor="dropzone-video"
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
                    Click Here Or Drop Files To Upload Video
                  </p>
                </label>
                <input
                  onChange={(e) =>
                    handleUpload(e, "video", setVideoUploading, setVideoUrl)
                  }
                  type="file"
                  id="dropzone-video"
                  className="hidden"
                  accept="video/*"
                />
                <div className="pt-5">
                  {videoUrl.length > 0 && (
                    <PreviewVideo setUrl={setVideoUrl} url={videoUrl[0]} />
                  )}
                  {videoUploading && (
                    <div className="w-[350px] h-[200px] rounded-lg bg-black/50 flex items-center justify-center">
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
                <p className="text-gray-600">Video is uploading...</p>
              )}
            </div>
          </div>

          {/* Property Location */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-[#24324A] my-5">
                Property Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Maps Latitude</FormLabel>
                      <FormControl>
                        <Input placeholder="Google Maps latitude" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Maps Longitude</FormLabel>
                      <FormControl>
                        <Input placeholder="Google Maps longitude" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Extra Information */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-[#24324A] my-5">
                Extra Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Age</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Age" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 Years</SelectItem>
                          <SelectItem value="0-5">0-5 Years</SelectItem>
                          <SelectItem value="0-10">0-10… Years</SelectItem>
                          <SelectItem value="0-15">0-15 Years</SelectItem>
                          <SelectItem value="0-20">0-20 Years</SelectItem>
                          <SelectItem value="0-50">0-50 Years</SelectItem>
                          <SelectItem value="50+">50+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rooms</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Rooms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Room" : "Rooms"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Bathrooms" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Features */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-[#24324A] my-5">
                Property Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {features.map((feature) => (
                  <FormField
                    key={feature}
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(feature)}
                            onCheckedChange={(checked) => {
                              const value = field.value || [];
                              return checked
                                ? field.onChange([...value, feature])
                                : field.onChange(
                                    value.filter((item) => item !== feature)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{feature}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-[#24324A] my-5">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <span>Submitting</span>{" "}
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              </div>
            </div>
          ) : (
            "Submit Property"
          )}
        </Button>
      </form>
      <Toaster position="top-center" />
    </Form>
  );
}
