"use client";
import Image from "next/image";
import { Play, Star } from "lucide-react";
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
import { useGetAllManagementsQuery } from "@/redux/api/features/management/managementApi";

export default function Managements() {
    const [deleteProduct] = useDeleteProductMutation();
    const [showVideo, setShowVideo] = useState(false);
    const { data, isLoading } = useGetAllManagementsQuery('')
    const aboutData = data?.data[0]?.aboutPage;
    const contactData = data?.data[0]?.contactUsPage;
    const faqData = data?.data[0]?.faqPage?.faq;
    console.log("aboutData, ", aboutData)


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
    if (data?.data.length === 0) {
        return <Nodata />;
    }

    return (
        <>
            <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
                    About Us Page Data
                </h2>
                <div className="w-full">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead colSpan={2}>Video</TableHead>
                                <TableHead>Signature</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Btn Link</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            <TableRow>
                                <TableCell colSpan={2} className="py-5">
                                    <div className="flex items-start gap-4">
                                        <div className="relative h-[70px] w-24 overflow-hidden rounded-lg">
                                            {/* Video Section */}
                                            <div className="relative rounded-lg overflow-hidden">
                                                {showVideo ? (
                                                    <iframe
                                                        width="100%"
                                                        height="400"
                                                        src={aboutData?.video}
                                                        title="YouTube video player"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="rounded-lg"
                                                    />
                                                ) : (
                                                    <div
                                                        className="relative cursor-pointer group"
                                                        onClick={() => setShowVideo(true)}
                                                    >
                                                        <Image
                                                            width={1000}
                                                            height={1000}
                                                            src="https://code-theme.com/html/findhouses/images/bg/bg-video.jpg"
                                                            alt="Video thumbnail"
                                                            className="w-full h-[400px] object-cover rounded-lg"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                <Play className="w-20 h-10 text-white fill-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-medium leading-none">
                                                {aboutData.title}
                                            </h3>
                                            {/* <p className="text-sm text-muted-foreground whitespace-nowrap">
                                            {product.category}
                                        </p> */}

                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <Image
                                        src={aboutData.signatureImage}
                                        alt={aboutData.title}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src =
                                                "https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg";
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="py-5">
                                    {aboutData.description}
                                </TableCell>
                                <TableCell className="py-5">
                                    {aboutData.btnLink}
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex gap-3 items-center justify-end">
                                        <Link href={`/admin-dashboard/edit-product/${aboutData._id}`}>
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
                                            onConfirm={() => handleDeleteProduct(aboutData._id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
                    Contact Page Data
                </h2>
                <div className="w-full">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead colSpan={2}>Title</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            <TableRow>
                                <TableCell colSpan={2} className="py-5">
                                    <h3 className="font-medium mb-1 leading-none">
                                        {contactData.title}
                                    </h3>
                                    <p>{contactData.description}</p>
                                </TableCell>
                                <TableCell className="py-5">
                                    <p>{contactData.location}</p>
                                </TableCell>
                                <TableCell className="py-5">
                                    {contactData.email}
                                </TableCell>
                                <TableCell className="py-5">
                                    {contactData.phone}
                                </TableCell>
                                <TableCell className="py-5">
                                    {contactData.time}
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex gap-3 items-center justify-end">
                                        <Link href={`/admin-dashboard/edit-product/${contactData._id}`}>
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
                                            onConfirm={() => handleDeleteProduct(contactData._id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
                    FAQ Page Data
                </h2>
                <div className="w-full">
                    <Table>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead colSpan={2}>Question</TableHead>
                                <TableHead>Answer</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {faqData.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={2} className="py-5">
                                        <h3 className="font-medium mb-1 leading-none">
                                            {item.question}
                                        </h3>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <p>{item.answer}</p>
                                    </TableCell>
                                    <TableCell className="py-5">
                                        <div className="flex gap-3 items-center justify-end">
                                            <Link href={`/admin-dashboard/edit-product/${item._id}`}>
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
                                                onConfirm={() => handleDeleteProduct(item._id)}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
