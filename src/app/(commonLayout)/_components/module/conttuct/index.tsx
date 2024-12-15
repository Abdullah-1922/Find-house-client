'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { useGetAllManagementsQuery } from '@/redux/api/features/management/managementApi';
import Spinner from '@/components/ui/spinner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSendContactMessageMutation } from '@/redux/api/features/contactUs/contactUsApi';

// Dynamically import with SSR disabled
const ProperLocation = dynamic(
  () => import('../propertyDetails/propertyLocation'),
  {
    ssr: false,
  }
);
const contactFormSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  email: z.string({ required_error: "Email is required" }),
  message: z.string({ required_error: "Message is required" }),
})
const ContactUs = () => {
  const { data, isLoading } = useGetAllManagementsQuery('');
  const [sendMessage, { isLoading: isMessageSending }] = useSendContactMessageMutation();
  const contactData = data?.data[0]?.contactUsPage;
  const form = useForm({
    resolver: zodResolver(contactFormSchema)
  })

  const handleSubmit = async (values: FieldValues) => {
    const loadingToast = toast.loading("Message submitting...");
    try {
      const res = await sendMessage(values);
      if (res?.data?.success) {
        toast.success("Message Sent Successfully", {
          id: loadingToast,
        });
        form.reset();
      } else {
        toast.error("Failed to send message", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("Failed to send message", {
        id: loadingToast,
      })
    }
  };
  return (
    <div className="">
      <div
        className="max-h-[300px] py-36"
        style={{
          backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://code-theme.com/html/findhouses/images/bg/bg-details.jpg)
    `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-3xl text-white text-center font-bold mb-2">
            Contact Us
          </h3>

          <p className="font-bold text-white text-lg">Home / Contact Us</p>
        </div>
      </div>
      <section className="w-full max-w-5xl mx-auto p-4 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">OUR LOCATION</h2>
        <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
          <ProperLocation />
        </div>
      </section>

      <section className="my-10">
        {isLoading ? <Spinner className='h-[400px]' /> : (

          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-20 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-2xl font-bold">CONTACT US</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm'>First Name</FormLabel>
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
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm'>Last Name</FormLabel>
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm'>Email</FormLabel>
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
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-sm'>Message</FormLabel>
                            <FormControl>
                              <Textarea rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className={`bg-gray-500 hover:bg-gray-600 text-white`}
                      disabled={isMessageSending}
                    >
                      {isMessageSending ? "Submitting..." : "Submit"}
                    </Button>
                  </form>
                </Form>

              </div>

              {/* Contact Details */}
              <div
                className="relative overflow-hidden rounded-lg"
                style={{
                  backgroundImage:
                    'url("https://code-theme.com/html/findhouses/images/bg/bg-testimonials.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-blue-600/80" />
                <div className="relative p-8 text-white">
                  <h2 className="mb-4 text-2xl font-bold">{contactData?.title}</h2>
                  <p className="mb-8 text-gray-100">
                    {contactData?.description}
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-gray-200" />
                      <span>{contactData?.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-gray-200" />
                      <span>{contactData?.phone}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-200" />
                      <span>{contactData?.email}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Clock className="h-5 w-5 text-gray-200" />
                      <span>{contactData?.time}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </section>
    </div>
  );
};

export default ContactUs;
