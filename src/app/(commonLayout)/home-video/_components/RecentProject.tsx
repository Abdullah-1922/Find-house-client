import PropertyCard from '@/components/shared/card/PropertyCard';
import { TProperty } from '@/types';

const properties: TProperty[] = [
  {
    _id: '67372a4c5c0eade732d63cf8',
    author: {
      _id: '673704d3db3cdc44c18d7b6b',
      firstName: 'Abdullah Al Kafi7',
      secondName: 'Al Kafi',
      auth: '673704d3db3cdc44c18d7b69',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
      role: 'user',
      paymentHistory: [],
      property: ['67372a4c5c0eade732d63cf8'],
      createdAt: '2024-11-15T08:22:43.986Z',
      updatedAt: '2024-11-15T11:02:36.369Z',
      __v: 0,
    },
    ownedBy: {
      _id: '673704d3db3cdc44c18d7b6b',
      firstName: 'Abdullah Al Kafi7',
      secondName: 'Al Kafi',
      auth: '673704d3db3cdc44c18d7b69',
      image:
        'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
      role: 'user',
      paymentHistory: [],
      property: ['67372a4c5c0eade732d63cf8'],
      createdAt: '2024-11-15T08:22:43.986Z',
      updatedAt: '2024-11-15T11:02:36.369Z',
      __v: 0,
    },
    status: 'active',
    feedback: [],
    title: 'Modern Apartment in Downtown4',
    description:
      'A spacious modern apartment located in the heart of the city with all the necessary amenities2.',
    category: 'rent',
    type: 'apartment',
    rooms: 3,
    price: 1500,
    area: 1200,
    images: [
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg',
      'https://code-theme.com/html/findhouses/images/feature-properties/fp-2.jpg',
    ],
    location: {
      address: '1234 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      latitude: '40.712776',
      longitude: '-74.005974',
    },
    extraInfo: {
      age: '0-10',
      rooms: 3,
      bathrooms: 2,
      _id: '67372a4c5c0eade732d63cf9',
    },
    features: [
      'Air Conditioning',
      'Central Heating',
      'TV Cable & WIFI',
      'Laundry Room',
    ],
    contactInfo: {
      name: 'John Doe',
      userName: 'johndoe123',
      phone: '+1 123 456 7890',
      email: 'johndoe@example.com',
      _id: '67372a4c5c0eade732d63cfa',
    },
    createdAt: '2024-11-15T11:02:36.133Z',
    updatedAt: '2024-11-17T11:04:31.602Z',
    comment: ['673896e4ceacaa8f003fa53c', '6739cdbf4cf3dd5b02aae3c1'],
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
          <PropertyCard
            key={property.id}
            property={property}
            isGridView={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentProject;
