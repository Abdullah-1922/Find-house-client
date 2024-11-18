'use client';

import * as React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import SignUpForm from '../_components/module/signup';

export default function SignUpPage() {
  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] bg-[url('https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center">
            <nav className="text-sm mb-4 flex flex-col items-center justify-center">
              <ol className="space-x-2 flex text-white/60">
                <li>
                  <Link href="/" className="flex items-center hover:text-white">
                    <Home className="h-4 w-4 mr-1" />
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>Register</li>
              </ol>
            </nav>
            <h1 className="text-4xl font-bold text-white">REGISTER</h1>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 md:px-4 py-12">
        <SignUpForm />
      </div>
    </div>
  );
}
