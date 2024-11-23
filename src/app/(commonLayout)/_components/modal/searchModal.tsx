'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { TBlog } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: TBlog[] | null;
}

export function SearchModal({ isOpen, onClose, results }: SearchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Results</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[60vh]">
          {results && results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((blog) => (
                <li key={blog._id} className="py-2">
                  <Link
                    href={`/blog/${blog._id}`}
                    className="flex items-center space-x-4 p-4 rounded-lg transition-colors duration-200 border hover:bg-gray-100"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={blog.image || '/placeholder.svg'}
                        alt={blog.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {blog.description.slice(0, 15) ||
                          'No excerpt available'}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
