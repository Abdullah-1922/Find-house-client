'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface AgentInformationProps {
  agent?: {
    name: string;
    title: string;
    address: string;
    phone: string;
    email: string;
    image: string;
  };
}

export default function AgentInformation({
  agent = {
    name: 'Lisa Clark',
    title: 'Agent of Property',
    address: '302 Av Park, New York',
    phone: '(234) 0200 17813',
    email: 'lisa@gmail.com',
    image:
      'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
  },
}: AgentInformationProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className='text-gray-800"'>Agent information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Profile */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.title}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-800" />
            <span>{agent.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-800" />
            <span>{agent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-800" />
            <span>{agent.email}</span>
          </div>
        </div>

        {/* Inquiry Form */}
        <div>
          <h3 className="font-semibold mb-4">Request Inquiry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Full Name"
                required
                className="border-input/50"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="Phone Number"
                required
                className="border-input/50"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email Address"
                required
                className="border-input/50"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Message"
                required
                className="min-h-[100px] border-input/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900"
            >
              Submit Request
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
