import PropertyCard from '@/components/shared/card/PropertyCard';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  garages: number;
  featured: boolean;
  status: 'For Sale' | 'For Rent';
  imageUrl: string;
}

const properties: Property[] = [
  {
    id: '1',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://www.shutterstock.com/image-photo/beautiful-home-exterior-600nw-160071032.jpg',
  },
  {
    id: '2',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Rent',
    imageUrl:
      'https://www.premierhomesca.com/wp-content/uploads/2020/03/EL3-Model-11-scaled-e1611704624780.jpg',
  },
  {
    id: '3',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },
  {
    id: '4',
    title: 'Real House Luxury Villa',
    location: 'Est St. 77 - Central Park South, NYC',
    price: 150000,
    bedrooms: 6,
    bathrooms: 3,
    area: 720,
    garages: 2,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },

  {
    id: '5',
    title: 'Lakefront Cabin',
    location: '321 Lakeview Rd, Lake Tahoe, CA',
    price: 220000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1000,
    garages: 1,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },
  {
    id: '6',
    title: 'Cozy Downtown Condo',
    location: '654 Main St, Chicago, IL',
    price: 160000,
    bedrooms: 2,
    bathrooms: 1,
    area: 750,
    garages: 0,
    featured: false,
    status: 'For Rent',
    imageUrl:
      'https://www.shutterstock.com/image-photo/beautiful-home-exterior-600nw-160071032.jpg',
  },
  {
    id: '7',
    title: 'Luxury Penthouse',
    location: '77 Park Ave, NYC',
    price: 450000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1400,
    garages: 1,
    featured: true,
    status: 'For Sale',
    imageUrl:
      'https://townsquare.media/site/192/files/2024/01/attachment-14802-Oxford-Ave-Lubbock-TX-79423-MLS-202316309-Zillow.jpg?w=780&q=75',
  },
];

const PopularProperties = () => {
  return (
    <div>
      <div
        className="h-full py-20 relative overflow-hidden"
        style={{
          backgroundImage:
            'url(https://code-theme.com/html/findhouses/images/blog/b-11.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for blur effect */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
            <div className="z-10 w-full md:w-6/12">
              <h1 className="text-3xl font-bold text-white my-5">
                Popular Properties
              </h1>
              <p className="text-white">
                We Help you find the best places and offer near
              </p>
              <br />
              <p className="text-white">
                you. Bring to the table win-win survival strategies
              </p>
              <br />
              <p className="text-white">
                to ensure proactive domination going forward.
              </p>
              <br />
              <button className="mt-6 rounded-md bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
                Get Started
              </button>
            </div>
            <div className="grid grid-cols-2 gap-10 z-20 w-full">
              {properties.slice(0, 2).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProperties;
