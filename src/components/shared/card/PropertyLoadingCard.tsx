import { Card, CardContent } from '@/components/ui/card';

export default function PropertyLoadingCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        <div className="aspect-[4/3] bg-muted animate-pulse" />
        <div className="absolute top-4 left-4">
          <div className="h-6 w-20 bg-background/80 backdrop-blur-sm rounded-full animate-pulse" />
        </div>
        <div className="absolute top-4 right-4">
          <div className="h-6 w-12 bg-red-500/80 backdrop-blur-sm rounded-full animate-pulse" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-4 border-t">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
