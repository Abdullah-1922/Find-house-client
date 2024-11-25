"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";
import DynamicPagination from "@/components/shared/pagination/DynamicPagination";
import Link from "next/link";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/features/product/productApi";
import { PopConfirm } from "@/components/ui/pop-confirm";
import { toast } from "sonner";
import Nodata from "@/components/ui/noData";

export default function AllProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProduct] = useDeleteProductMutation();
  const limit = 5;

  const { data, isLoading } = useGetAllProductsQuery(
    `limit=${limit}&page=${currentPage}`
  );
  const productData = data?.data;

  // handle pagination
  const meta = data?.meta;
  const totalPages = meta?.totalPage;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Selected Page:", page);
  };

  // handle delete product
  const handleDeleteProduct = async (id: string) => {
    const loadingToast = toast.loading("Product deleting...");
    const res = await deleteProduct(id);

    if (res?.data?.success) {
      toast.success("Product Deleted Successfully", {
        id: loadingToast,
      });
    } else {
      toast.error("Failed to delete product", {
        id: loadingToast,
      });
    }
  };

  if (isLoading) return <Spinner className="h-[600px]" />;
  if (productData.length === 0) {
    return <Nodata />;
  }

  return (
    <div className="space-y-6 bg-white rounded-md border p-5">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
        All Products
      </h2>
      <div className="w-full">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead colSpan={2}>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData?.map((product: TProduct, index: number) => (
              <TableRow
                key={product._id}
                className={`${index % 2 === 0 ? "bg-muted/50" : ""}`}
              >
                <TableCell colSpan={2} className="py-5">
                  <div className="flex items-start gap-4">
                    <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg";
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium leading-none">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {product.category}
                      </p>
                      <div className="flex items-center whitespace-nowrap gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground mt-1">
                          ({product.review.length} Reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-5">${product.price}</TableCell>
                <TableCell className="py-5">
                  {format(product.createdAt, "dd MMM, yyyy")}
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex gap-3 items-center justify-end">
                    <Link href={`/admin-dashboard/edit-product/${product._id}`}>
                      <Button
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </Link>
                    <PopConfirm
                      name={"product"}
                      onConfirm={() => handleDeleteProduct(product._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
