import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Spinner from '@/components/ui/spinner';
import { useGetAllPropertiesQuery } from '@/redux/api/features/property/propertyApi';
import { TProperty } from '@/types';
import Link from 'next/link';

export default function FeaturedProperties() {
  const { data, isLoading } = useGetAllPropertiesQuery(`sort=views&limit=3`);
  const properties = data?.data;
  if (isLoading) return <Spinner />;
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-gray-800"'>Feature Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            {properties?.map((property: TProperty) => (
              <CarouselItem key={property.id}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                  <div className="absolute left-4 right-4 top-4 flex justify-between">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                      ${property.price.toLocaleString()}
                    </Badge>
                    <Badge className="bg-rose-500 text-white hover:bg-rose-600 capitalize">
                      {property.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Link href={`/all-properties/${property._id}`}>
                      <h3 className="text-xl font-bold text-white">
                        {property.title}
                      </h3>
                    </Link>
                    <p className="text-white/90">{`${property.location.address}, ${property.location.city}`}</p>
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
