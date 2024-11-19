'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialLogin from '../module/signup/socialLogin';

export default function SignInModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    remember: false,
  });
  const pathname = usePathname();
  console.log(pathname);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      remember: !prev.remember,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${
            pathname === '/home-video'
              ? 'text-white hover:text-white hover:bg-gray-50/20'
              : 'text-black'
          }`}
          variant="ghost"
        >
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[425px] z-[999999]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              Welcome to{' '}
              <span className="text-gray-800 font-bold">FINDHOUSES</span>
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Social Login */}
        <SocialLogin />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username or Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 top-5 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button variant="link" className="px-0 text-gray-800">
                Lost Your Password?
              </Button>
            </div>
            <Button
              className="w-full bg-gray-800 hover:bg-gray-800/90"
              type="submit"
            >
              Sign In
            </Button>
          </div>
          <p className="mt-5 text-center">
            You have no account ?{' '}
            <Link
              onClick={() => setOpen(false)}
              className="text-blue-500 underline"
              href={'/signup'}
            >
              Create account
            </Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
