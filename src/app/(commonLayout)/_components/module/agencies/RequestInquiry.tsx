import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone } from 'lucide-react';
import React from 'react';

export default function RequestInquiry() {
  return (
    <Card>
      <CardHeader>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Phone className="h-5 w-5" />
          Request Inquiry
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" placeholder="Enter your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="Enter your phone number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Write your message here" />
        </div>
        <Button className="w-full bg-gray-800 hover:bg-gray-900">
          Submit Request
        </Button>
      </CardContent>
    </Card>
  );
}
