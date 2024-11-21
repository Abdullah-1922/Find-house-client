import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function CommentForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Reset form
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="bg-primary text-primary-foreground">
        Submit Comment
      </Button>
    </form>
  );
}
