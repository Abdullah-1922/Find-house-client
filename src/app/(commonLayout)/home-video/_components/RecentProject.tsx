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

const RecentProject = () => {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <div>
        <h2 className="text-center text-4xl font-bold pt-20">
          Featured Properties
        </h2>
        <p className="text-center text-gray-500">
          We provide full service at every step.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
        {properties.slice(0, 6).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default RecentProject;
