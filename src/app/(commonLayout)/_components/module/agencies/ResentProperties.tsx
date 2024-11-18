import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const recentProperties = [
  {
    id: 1,
    title: 'Family Home',
    price: 230000,
    image:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-3.jpg',
  },
  {
    id: 2,
    title: 'Family Home',
    price: 230000,
    image:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-2.jpg',
  },
  {
    id: 3,
    title: 'Family Home',
    price: 230000,
    image:
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
  },
];

export default function ResentProperties() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-gray-800"'>Recent Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProperties.map((property) => (
            <div key={property.id} className="flex items-center gap-4">
              <Image
                src={property.image}
                alt={property.title}
                width={100}
                height={75}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">{property.title}</h3>
                <p className="text-lg font-semibold text-primary">
                  ${property.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
