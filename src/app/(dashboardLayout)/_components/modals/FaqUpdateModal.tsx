import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { FieldValues, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useUpdateManagementsMutation } from "@/redux/api/features/management/managementApi"
import { Dispatch, SetStateAction } from "react"

export function FaqUpdateModal({ data, id, setFaqs, faqs, indexToUpdate }: { data: { question: string, answer: string }, id: string, setFaqs: Dispatch<SetStateAction<string[]>>, faqs: string[] ,indexToUpdate: number}) {
    const [updateContactData] = useUpdateManagementsMutation();
    const form = useForm({
        defaultValues: {
            question: data?.question,
            answer: data?.answer,
        }
    });
    console.log("newfaqs, ", faqs)
    const handleSubmit = async (values: FieldValues) => {
        console.log("values, ", values)
        const updatedFaqs = faqs.map((item, i) =>
            i === indexToUpdate ? { ...item, ...values } : item
        );
    
        // Update the state
        setFaqs(updatedFaqs);
        const res = await updateContactData({  data: {faqPage: {faq: updatedFaqs}}, id });
        console.log("res, ", res)
        const loadingToast = toast.loading("data updating...");
        if (res?.data?.success) {
            toast.success("data updated Successfully", {
                id: loadingToast,
            });
        } else {
            toast.error("Failed to update data", {
                id: loadingToast,
            });
        }
    }
    return (
        <div className="">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="z-[999] h-[85vh] overflow-y-scroll">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Contact Data</AlertDialogTitle>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="question"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Question</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="answer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Answer</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit">Save Changes</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
