import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Banner({ pageName }: { pageName: string }) {
  return (
    <div
      className="h-[300px] flex items-center justify-center"
      style={{
        backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(https://code-theme.com/html/findhouses/images/blog/b-2.jpg)
    `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex justify-center items-center flex-col">
        <h3 className="text-3xl text-white text-center font-bold mb-2">
          {pageName}
        </h3>

        <p className="text-white flex items-center text-lg gap-1">
          <Link
            href={'/'}
            className="flex items-center gap-0.5 hover:text-gray-200"
          >
            <Home className="text-sm" /> Home
          </Link>{' '}
          <p>/ {pageName}</p>
        </p>
      </div>
    </div>
  );
}
