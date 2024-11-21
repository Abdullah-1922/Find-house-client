import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function SocialLogin() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3">
        <Button
          onClick={async () =>
            await signIn('facebook', {
              callbackUrl: window.location.origin || '/',
            })
          }
          className="w-full bg-transparent hover:bg-gray-300 border border-gray-800 rounded-full text-black"
          variant="default"
        >
          <Facebook className="mr-2 size-5 text-blue-500" />
          Log in with Facebook
        </Button>
        <Button
          onClick={async () =>
            await signIn('twitter', {
              callbackUrl: window.location.origin || '/',
            })
          }
          className="w-full bg-transparent hover:bg-gray-300 border border-gray-800 rounded-full text-black"
          variant="default"
        >
          <Twitter className="mr-2 size-5 text-blue-500" />
          Log in with Twitter
        </Button>
      </div>
      <div className="relative mt-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
    </div>
  );
}
