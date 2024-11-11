import { Delete, Eye } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
}

const messages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Mary Smith',
      avatar: '/placeholder.svg',
      initials: 'MS',
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    timestamp: '22 Minutes ago',
  },
  {
    id: '2',
    sender: {
      name: 'Karl Tyron',
      avatar: '/placeholder.svg',
      initials: 'KT',
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    timestamp: '23 Minutes ago',
  },
  {
    id: '3',
    sender: {
      name: 'Lisa Willis',
      avatar: '/placeholder.svg',
      initials: 'LW',
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    timestamp: '53 Minutes ago',
  },
];

export default function MessagesList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-700">Message</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex flex-col md:flex-row items-start gap-4 rounded-lg border p-4"
          >
            <Avatar className="size-16">
              <AvatarImage
                src={message.sender.avatar}
                alt={message.sender.name}
              />
              <AvatarFallback>{message.sender.initials}</AvatarFallback>
            </Avatar>
            <div className="flex items-start gap-4">
              <div className="grid flex-1 items-center gap-1">
                <div className="flex flex-col">
                  <div className="font-semibold">{message.sender.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {message.timestamp}
                  </div>
                </div>
                <p className="text-sm text-muted-foregrounds">
                  {message.content}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-7">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="size-6" />
                <span className="sr-only">View message</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Delete className="size-6 text-red-500" />
                <span className="sr-only">Copy message</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
