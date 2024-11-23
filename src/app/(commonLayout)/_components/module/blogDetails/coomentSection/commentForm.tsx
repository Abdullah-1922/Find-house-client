'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function CommentForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Message cannot be empty.');
      return;
    }
    console.log('Submitted:', { message });
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        name="message"
        placeholder="Write your comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="text-gray-700"
      />
      <Button type="submit" className="bg-primary text-primary-foreground">
        Submit Comment
      </Button>
    </form>
  );
}
