import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface PropertyListingProps {
  title?: string;
  price?: number;
  pricePerSqFt?: number;
  location?: string;
  description?: string;
}

export default function PropertyDescription({
  title = 'Luxury Villa House',
  price = 230000,
  pricePerSqFt = 1200,
  location = '77 - Central Park South, NYC',
  description = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum rerum beatae consequatur, totam fugit, alias fuga aliquam quod tempora a nisi esse magnam nulla quas! Error praesentium, vero dolorum laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum rerum beatae consequatur, totam fugit.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum rerum beatae consequatur, totam fugit, alias fuga aliquam quod tempora a nisi esse magnam nulla quas! Error praesentium, vero dolorum laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum rerum beatae consequatur, totam fugit.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum rerum beatae consequatur, totam fugit, alias fuga aliquam quod tempora a nisi esse magnam nulla quas! Error praesentium, vero dolorum laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum rerum beatae consequatur, totam fugit.`,
}: PropertyListingProps) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{title}</h1>
              <Badge variant="destructive" className="rounded-full">
                For Sale
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-destructive">
              ${price.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              ${pricePerSqFt.toLocaleString()} / sq ft
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Description
            <div className="h-1 w-12 bg-gray-800 mt-1" />
          </h2>
          <div className="text-muted-foreground space-y-4">
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
