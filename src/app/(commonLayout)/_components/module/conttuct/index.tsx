'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import { useGetAllManagementsQuery } from '@/redux/api/features/management/managementApi';
import Spinner from '@/components/ui/spinner';

// Dynamically import with SSR disabled
const ProperLocation = dynamic(
  () => import('../propertyDetails/propertyLocation'),
  {
    ssr: false,
  }
);
const ContactUs = () => {
  const { data, isLoading } = useGetAllManagementsQuery('')
  const contactData = data?.data[0]?.contactUsPage;
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append('access_key', '57cc6553-f453-48db-aa23-d96f406f6bc5');

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully!');
        event.target.reset(); // Reset the form
      } else {
        toast.error('Failed to send the message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="First Name"
                    className="border-gray-200"
                  />
                  <Input
                    name="name"
                    type="text"
                    placeholder="Last Name"
                    className="border-gray-200"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-gray-200"
                  />
                  <Textarea
                    name="message"
                    placeholder="Message"
                    className="min-h-[150px] border-gray-200"
                  />
                  <Button
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-600 text-white"
                  >
                    Submit
                  </Button>
                </form>
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
