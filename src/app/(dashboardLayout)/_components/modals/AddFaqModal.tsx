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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema  = z.object({
    question: z.string({required_error: "Question is required!"}),
    answer: z.string({required_error: "Answer is required!"})
})

export function AddFaqModal({ id, setFaqs, faqs }: { id: string, setFaqs: Dispatch<SetStateAction<object[]>>, faqs: object[] }) {
    const [addFaq] = useUpdateManagementsMutation();
    const form = useForm({
        resolver: zodResolver(schema)
    });
    
    const handleSubmit = async (values: FieldValues) => {
        console.log("values, ", values)

        const updatedFaqs = [...faqs, values]
        // Update the state
        setFaqs(updatedFaqs);
        const res = await addFaq({ data: { faqPage: { faq: updatedFaqs } }, id });
        console.log("res, ", res)
        const loadingToast = toast.loading("faq updating...");
        if (res?.data?.success) {
            toast.success("faq added Successfully", {
                id: loadingToast,
            });
        } else {
            toast.error("Failed to add faq", {
                id: loadingToast,
            });
        }
    }
    return (
        <div className="">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Add New</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="z-[999]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add A New Faq</AlertDialogTitle>
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
                                    <AlertDialogAction type="submit">Add</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
