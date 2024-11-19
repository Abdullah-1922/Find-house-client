import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <Card className="max-w-[340px] overflow-hidden">
      <Skeleton className="w-full h-64" />
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 mx-2 rounded-full" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4 mx-2 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-8 mr-2" />
            <Skeleton className="w-8 h-8 rounded-full mr-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
