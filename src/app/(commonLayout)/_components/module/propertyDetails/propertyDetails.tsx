import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PropertyDetailsProps {
  details?: {
    id: string;
    type: string;
    status: string;
    price: number;
    rooms: number;
    bedrooms: number;
    bath: number;
    garages: number;
    yearBuilt: string;
  };
  amenities?: string[];
}

export default function PropertyDetails({
  details = {
    id: 'V254680',
    type: 'House',
    status: 'For Sale',
    price: 230000,
    rooms: 6,
    bedrooms: 7,
    bath: 4,
    garages: 2,
    yearBuilt: '10/6/2020',
  },
  amenities = [
    'Air Cond',
    'Balcony',
    'Internet',
    'Dishwasher',
    'Bedding',
    'Cable TV',
    'Parking',
    'Pool',
    'Fridge',
  ],
}: PropertyDetailsProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Property Details Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Property Details
              <div className="h-1 w-12 bg-gray-800 mt-1" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Property ID:
                </div>
                <div className="font-medium">{details.id}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Property Type:
                </div>
                <div className="font-medium">{details.type}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Property status:
                </div>
                <div className="font-medium">{details.status}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Property Price:
                </div>
                <div className="font-medium">
                  ${details.price.toLocaleString()}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Rooms:</div>
                <div className="font-medium">{details.rooms}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Bedrooms:</div>
                <div className="font-medium">{details.bedrooms}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Bath:</div>
                <div className="font-medium">{details.bath}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Garages:</div>
                <div className="font-medium">{details.garages}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Year Built:</div>
                <div className="font-medium">{details.yearBuilt}</div>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Amenities
              <div className="h-0.5 w-12 bg-gray-800 mt-1" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-sm bg-gray-800/10">
                    <Check className="w-4 h-4 text-gray-800" />
                  </div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
