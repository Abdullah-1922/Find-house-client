"use client";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import {
    useDeleteProductMutation,
} from "@/redux/api/features/product/productApi";
import { PopConfirm } from "@/components/ui/pop-confirm";
import { toast } from "sonner";
import Nodata from "@/components/ui/noData";
import { useGetAllManagementsQuery, useUpdateManagementsMutation } from "@/redux/api/features/management/managementApi";
import { AboutDataUpdateModal } from "../../_components/modals/AboutDataUpdateModal";
import { ContactDataUpdateModal } from "../../_components/modals/ContactDataUpdateModal";
import { FaqUpdateModal } from "../../_components/modals/FaqUpdateModal";
import { useEffect, useState } from "react";
import { AddFaqModal } from "../../_components/modals/AddFaqModal";

export default function Managements() {
    const [deleteFaq] = useUpdateManagementsMutation()
    const { data, isLoading } = useGetAllManagementsQuery('')
    const [faqs, setFaqs] = useState<object[]>([]);
    const aboutData = data?.data[0]?.aboutPage;
    const contactData = data?.data[0]?.contactUsPage;
    const faqData = data?.data[0]?.faqPage?.faq;
    console.log("faqs, ", data?.data[0])
    useEffect(() => {
        if (faqData?.length) {
            setFaqs(faqData)
        }
    }, [faqData])

    // handle delete product
    const handleDeleteFaq = async (index: number) => {
        const updatedFaqs = [...faqs];
        updatedFaqs.splice(index, 1);
        setFaqs(updatedFaqs);
        const res = await deleteFaq({ data: { faqPage: { faq: updatedFaqs } }, id: data?.data[0]?._id });
        console.log("res, ", res)
        const loadingToast = toast.loading("faq deleting...");
        if (res?.data?.success) {
            toast.success("faq deleted Successfully", {
                id: loadingToast,
            });
        } else {
            toast.error("Failed to delete faq", {
                id: loadingToast,
            });
        }
    }

    if (isLoading) return <Spinner className="h-[600px]" />;
    if (data?.data.length === 0) {
        return <Nodata />;
    }

    return (
        <>
            <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
                    About Data
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
                                    <h3 className="font-medium mb-1 leading-none">
                                        {aboutData?.title}
                                    </h3>
                                    <iframe
                                        width="270"
                                        height="150"
                                        src={aboutData?.video}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-lg"
                                    />
                                </TableCell>
                                <TableCell className="py-5">
                                    <Image
                                        width={150}
                                        height={150}
                                        src={aboutData?.signatureImage}
                                        alt="Signature"
                                        className="h-12 object-contain"
                                    />
                                </TableCell>
                                <TableCell className="py-5">
                                    {aboutData?.description}
                                </TableCell>
                                <TableCell className="py-5">
                                    {aboutData?.btnLink}
                                </TableCell>
                                <TableCell className="py-5">
                                    <AboutDataUpdateModal data={{ ...aboutData, id: data?.data[0]?._id }} />
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
                                    <ContactDataUpdateModal data={{ ...contactData, id: data?.data[0]?._id }} />
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="space-y-6 bg-white rounded-md border p-2 md:p-5 m-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-700">
                        FAQ Page Data
                    </h2>
                    <AddFaqModal id={data?.data[0]?._id} faqs={faqs} setFaqs={setFaqs} />
                </div>
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

                            {faqs.map((item: any, index: number) => (
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
                                        <div className="flex items-center gap-3">
                                            <FaqUpdateModal indexToUpdate={index} setFaqs={setFaqs} faqs={faqs} data={{ question: faqData[index]?.question, answer: faqData[index]?.answer }} id={data?.data[0]?._id} />
                                            <PopConfirm name="faq item" onConfirm={() => handleDeleteFaq(index)} />
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
