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
                <PropertyCard
                  key={property.id}
                  property={property}
                  isGridView={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProperties;
