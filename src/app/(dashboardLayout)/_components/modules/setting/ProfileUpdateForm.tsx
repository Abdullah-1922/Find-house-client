'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast, Toaster } from 'sonner';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import PreviewImage from '@/components/ui/previewImage';
import { Loader } from 'lucide-react';
import { useUser } from '@/hooks/user.hook';
import { useUpdateUserMutation } from '@/redux/api/features/users/userApi';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  secondName: z.string().min(2, {
    message: 'Second name must be at least 2 characters.',
  }),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  profileImage: z.string().optional(),
});

export function ProfileUpdateForm() {
  const { user } = useUser();
  const [profileImage, setProfileImage] = useState<string>(''); // Tracks profile image state
  const [uploading, setUploading] = useState(false);

  // Mutation for updating user
  const [updateUserMutationFn, { isLoading }] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Update form values when user data is available
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
        phone: user.phone,
        location: user.location,
        profileImage: user.image,
      });
      setProfileImage(user.image);
    }
  }, [user, form]);

  async function handleProfileImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    setProfileImage: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const secureUrl = await uploadToCloudinary(file, 'image');
      setProfileImage(secureUrl);
      toast.success('Profile image uploaded successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, secondName, email, location, phone } = values;

    const formData = {
      firstName,
      secondName,
      email,
      phone,
      location,
      image: profileImage, // Include profileImage in payload
    };

    console.log('Form data being sent to backend:', formData);

    try {
      const updateData = {
        id: user?._id,
        data: formData,
      };
      const res = await updateUserMutationFn(updateData).unwrap();

      console.log('Profile update response:', res);
      toast.success('Profile updated', {
        description: 'Your profile has been updated successfully.',
      });

      form.reset(formData);
    } catch (error: any) {
      toast.error('Failed to update profile. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            className="bg-gray-800 hover:bg-gray-900"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">First Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-10"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="secondName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Second Name</FormLabel>
                <FormControl>
                  <Input className="w-full h-10" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-10"
                    type="email"
                    placeholder="john.doe@example.com"
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
                <FormLabel className="font-semibold">Phone</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-10"
                    placeholder="+1 (555) 123-4567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Location</FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-10"
                    placeholder="New York, NY"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold">Profile Image</FormLabel>
                <div className="space-y-2">
                  <label
                    htmlFor="profileImageUpload"
                    className="border border-gray-400 block border-dashed rounded-lg h-10 text-center mx-auto cursor-pointer"
                  >
                    <input
                      type="file"
                      id="profileImageUpload"
                      accept="image/*"
                      onChange={(e) =>
                        handleProfileImageUpload(
                          e,
                          setProfileImage,
                          setUploading
                        )
                      }
                      className="w-full hidden"
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click Here To Upload
                    </p>
                  </label>
                  {uploading && (
                    <div className="max-h-[300px] min-h-[120px] w-[200px] animate-pulse rounded-lg bg-black/50 flex items-center justify-center">
                      <Loader
                        className="animate-spin text-white/90"
                        size={30}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-4 pt-5 flex-wrap max-h-[300px] min-h-[120px] object-cover">
                  {profileImage && (
                    <PreviewImage
                      image={profileImage}
                      setImages={() => setProfileImage('')}
                    />
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
      <Toaster />
    </Form>
  );
}
