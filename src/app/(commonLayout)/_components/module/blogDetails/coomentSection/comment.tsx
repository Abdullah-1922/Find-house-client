'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TBlogComment } from '@/types';

interface CommentProps {
  commentData: TBlogComment;
}

export function Comment({ commentData }: CommentProps) {
  const { comment, createdAt, userId } = commentData;
  const name = userId?.firstName || 'Anonymous';
  const avatarUrl = userId?.image || '/placeholder.svg';
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="flex gap-4 p-4 border-b text-gray-800">
      <Avatar className="w-12 h-12">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold text-gray-900">{name}</h4>
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <span className="mt-2 text-gray-700">{comment}</span>
      </div>
    </div>
  );
}
