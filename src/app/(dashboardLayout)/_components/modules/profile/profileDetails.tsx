import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ProfileDetail() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="mb-4">Profile Details</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src="https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg"
              alt="Lisa Clark"
            />
            <AvatarFallback>LC</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Lisa Clark</h2>
            <p className="text-sm text-muted-foreground">Agent of Property</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            302 Av Park, New York
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" />
            (234) 0200 17813
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            <Mail className="mr-2 h-4 w-4" />
            lisa@gmail.com
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Request Inquiry</h3>
          <hr />
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
              />
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
              <Textarea id="message" placeholder="Write your message here..." />
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
