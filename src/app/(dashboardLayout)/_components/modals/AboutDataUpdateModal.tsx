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
import { Textarea } from "@/components/ui/textarea"
import { FieldValues, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { useUpdateManagementsMutation } from "@/redux/api/features/management/managementApi"

export function AboutDataUpdateModal({ data }: { data: { id: string,title: string, video: string, description: string, signatureImage: string, btnLink: string } }) {
    const [updateAboutData] = useUpdateManagementsMutation();
    const form = useForm({
        defaultValues: {
            title: data?.title,
            signatureImage: data?.signatureImage,
            video: data?.video,
            description: data?.description,
            btnLink: data?.btnLink,
        }
    });

    const handleSubmit = async (values: FieldValues) => {
        console.log("values, ", values)
        const res = await updateAboutData({ data: values, id: data?.id });
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
                        <AlertDialogTitle>Update About Data</AlertDialogTitle>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
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
                                        name="video"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Video</FormLabel>
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
                                        name="signatureImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Signature</FormLabel>
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
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea rows={14} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="btnLink"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Button Link</FormLabel>
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
