import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Heart, Car, Star } from 'lucide-react';

interface NearbyLocation {
  name: string;
  distance: number;
  rating: number;
}

interface NearbyCategory {
  title: string;
  icon: JSX.Element;
  locations: NearbyLocation[];
}

export default function WhatsNearby() {
  const categories: NearbyCategory[] = [
    {
      title: 'Education',
      icon: <GraduationCap className="w-5 h-5 text-sky-500" />,
      locations: [
        { name: 'Education Mandarin', distance: 15.61, rating: 4.5 },
        { name: "Marry's Education", distance: 15.23, rating: 3.5 },
        { name: 'The Kaplan', distance: 15.16, rating: 2.5 },
      ],
    },
    {
      title: 'Health & Medical',
      icon: <Heart className="w-5 h-5 text-green-500" />,
      locations: [
        { name: 'Natural Market', distance: 13.2, rating: 4.5 },
        { name: 'Food For Health', distance: 13.22, rating: 3.5 },
        { name: 'A Matter of Health', distance: 13.34, rating: 2.5 },
      ],
    },
    {
      title: 'Transportation',
      icon: <Car className="w-5 h-5 text-destructive" />,
      locations: [
        { name: 'Airport Transportation', distance: 11.36, rating: 4.5 },
        { name: 'NYC Executive Limo', distance: 11.87, rating: 3.5 },
        { name: 'Empire Limousine', distance: 11.52, rating: 2.5 },
      ],
    },
  ];

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            } ${star <= rating - 0.5 ? 'fill-yellow-400' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            What&apos;s Nearby
            <div className="h-1 w-12 bg-gray-800 mt-1" />
          </h2>

          <div className="space-y-6">
            {categories.map((category, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-medium">
                  {category.icon}
                  <span>{category.title}</span>
                </div>
                <div className="space-y-2">
                  {category.locations.map((location, locationIndex) => (
                    <div
                      key={locationIndex}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {location.name}
                          <span className="text-muted-foreground ml-2">
                            ({location.distance.toFixed(2)} miles)
                          </span>
                        </span>
                      </div>
                      <StarRating rating={location.rating} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
