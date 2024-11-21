import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommentProps {
  name: string;
  date: string;
  message: string;
  avatarUrl?: string;
}

export function Comment({ name, date, message, avatarUrl }: CommentProps) {
  return (
    <div className="flex gap-4 p-4 border-b text-gray-800">
      <Avatar className="w-12 h-12">
        <AvatarImage
          src={avatarUrl || '/placeholder.svg?height=48&width=48'}
          alt={name}
        />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-muted-foreground">{date}</p>
        <p className="mt-2">{message}</p>
      </div>
    </div>
  );
}
