'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/hooks/user.hook';
import { useCreateBlogCommentMutation } from '@/redux/api/features/blog/blogCommentApi';
import { useState } from 'react';
import { toast } from 'sonner';
import { AuthorizationModal } from '../../../modal/authorizationModal';

export function CommentForm({ blogId }: { blogId: string }) {
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);

  // Comment create mutation hook
  const [createCommentFn, { isLoading }] = useCreateBlogCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for empty input
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    if (!user?._id) {
      setError(null); // Clear any previous errors
      toast.error('You must be logged in to comment.');
      return;
    }

    const commentData = {
      userId: user._id,
      blogId,
      comment: message.trim(),
    };

    try {
      setError(null);
      await createCommentFn(commentData).unwrap();
      setMessage('');
      toast.success('Comment added successfully.');
    } catch (err: any) {
      setError(
        err.data?.message || 'Failed to submit comment. Please try again.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-500 border border-red-500 p-2 rounded">
          {error}
        </div>
      )}
      <Textarea
        name="message"
        placeholder="Write your comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        disabled={isLoading}
        className="text-gray-700"
      />
      {user ? (
        <Button
          type="submit"
          className="bg-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Comment'}
        </Button>
      ) : (
        <AuthorizationModal buttonText="Submit Comment" />
      )}
    </form>
  );
}
