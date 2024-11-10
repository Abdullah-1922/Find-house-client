import { Heart, ListStart, MessageCircle, Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

function StatCard({ icon, label, value, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-sm font-medium text-white/80">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardStats() {
  const stats = [
    {
      icon: <ListStart className="h-6 w-6 text-white" />,
      label: 'Published Property',
      value: '345',
      className: 'bg-emerald-500',
    },
    {
      icon: <Star className="h-6 w-6 text-white" />,
      label: 'Total Reviews',
      value: '116',
      className: 'bg-orange-500',
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      label: 'Messages',
      value: '223',
      className: 'bg-blue-500',
    },
    {
      icon: <Heart className="h-6 w-6 text-white" />,
      label: 'Times Bookmarked',
      value: '432',
      className: 'bg-pink-500',
    },
  ];

  return (
    <div className="space-y-6 bg-white rounded-md border p-5">
      <h2 className="text-xl font-semibold tracking-tight text-gray-700">
        Manage Dashboard
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            className={stat.className}
          />
        ))}
      </div>
    </div>
  );
}
