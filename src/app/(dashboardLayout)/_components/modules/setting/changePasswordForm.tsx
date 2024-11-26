'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

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
import { useChangePasswordMutation } from '@/redux/api/features/auth/authApi';
import Link from 'next/link';

const formSchema = z
  .object({
    currentPassword: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Current password must be at least 6 characters'),
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(6, 'New password must be at least 6 characters')
      .refine((value) => /[A-Z]/.test(value), {
        message: 'New password must contain at least one uppercase letter',
      }),
    confirmPassword: z
      .string({ required_error: 'Confirm password is required' })
      .min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function ChangePasswordForm() {
  const [changePasswordFn, { isLoading }] = useChangePasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = Cookies.get('accessToken');
      if (!token) {
        toast.error('You are not authenticated. Please log in.');
        return;
      }

      const result = await changePasswordFn({
        token,
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
      }).unwrap();

      if (result.success) {
        toast.success('Password changed successfully!');
        form.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  }

  const PasswordInput = ({
    field,
    showPassword,
    setShowPassword,
    placeholder,
  }: any) => (
    <div className="relative">
      <Input
        className="w-full h-10 pr-10"
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        {...field}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <Form {...form}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Password Change</h1>
        <Button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? 'Changing...' : 'Change Password'}
        </Button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Current Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    showPassword={showCurrentPassword}
                    setShowPassword={setShowCurrentPassword}
                    placeholder="Enter your current password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  New Password
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    field={field}
                    showPassword={showNewPassword}
                    setShowPassword={setShowNewPassword}
                    placeholder="Enter a new password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-sm">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  placeholder="Confirm your new password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className="mt-6 text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </Form>
  );
}
