"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLogin from "../module/signup/socialLogin";
import { useLoginMutation } from "@/redux/api/features/auth/auth";
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie";

export default function SignInModal() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "junayednoman05@gmail.com",
    password: "Noman05",
    remember: false,
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const pathname = usePathname();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginFn, { isLoading }] = useLoginMutation();

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

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      remember: false,
    });
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await loginFn({
        email: formData.email,
        password: formData.password,
      });

      // If login successful
      if (res?.data?.success) {
        toast.success("Login successful");
        Cookies.set("accessToken", res.data.data.accessToken);
        Cookies.set("refreshToken", res.data.data.refreshToken);
        resetForm();
        setOpen(false);
      }

      // If error occurs
      if (res?.error) {
        setErrorMessage(
          res.error?.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="z-[9999]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={`${
              pathname === "/home-video"
                ? "text-white hover:text-white hover:bg-gray-50/20"
                : "text-black"
            }`}
            variant="ghost"
          >
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">
                Welcome to{" "}
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
                  type={showPassword ? "text" : "password"}
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
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              {errorMessage && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {errorMessage}
                </p>
              )}
            </div>
            <p className="mt-5 text-center">
              You have no account?{" "}
              <Link
                onClick={() => setOpen(false)}
                className="text-blue-500 underline"
                href={"/signup"}
              >
                Create account
              </Link>
            </p>
          </form>
          <Toaster />
        </DialogContent>
      </Dialog>
    </div>
  );
}
