import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function PopularTags() {
  const tags = [
    ['Houses', 'Real Home'],
    ['Baths', 'Beds'],
    ['Garages', 'Family'],
    ['Real Estates', 'Properties'],
    ['Location', 'Price'],
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Popular tags
          <div className="h-1 w-12 bg-gray-800 mt-1" />
        </h2>
      </CardHeader>
      <CardContent className="space-y-2">
        {tags.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                className="bg-background hover:bg-muted"
                size="sm"
              >
                {tag}
              </Button>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
