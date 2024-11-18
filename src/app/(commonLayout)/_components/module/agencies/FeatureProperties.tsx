import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const featuredProperties = [
  {
    id: 1,
    title: 'House Luxury',
    price: 230000,
    location: 'San Francisco',
    status: 'For Sale',
    image:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-2.jpg',
  },
  {
    id: 2,
    title: 'House Luxury',
    price: 230000,
    location: 'San Francisco',
    status: 'For Sale',
    image:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-3.jpg',
  },
];

export default function FeaturedProperties() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-gray-800"'>Feature Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {featuredProperties.map((property) => (
              <CarouselItem key={property.id}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute left-4 right-4 top-4 flex justify-between">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                      ${property.price.toLocaleString()}
                    </Badge>
                    <Badge className="bg-rose-500 text-white hover:bg-rose-600">
                      {property.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {property.title}
                    </h3>
                    <p className="text-white/90">{property.location}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
