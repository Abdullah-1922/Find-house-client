import SectionTitle from '@/components/ui/sectionTitle';
import Image from 'next/image';
const locations = [
  {
    name: 'New York City',
    propertiesCount: 203,
    image:
      'https://code-theme.com/html/findhouses/images/popular-places/12.jpg',
    isFeatured: true,
  },
  {
    name: 'Los Angeles',
    propertiesCount: 150,
    image:
      'https://code-theme.com/html/findhouses/images/popular-places/11.jpg',
    isFeatured: false,
  },
  {
    name: 'Chicago',
    propertiesCount: 75,
    image:
      'https://code-theme.com/html/findhouses/images/popular-places/10.jpg',
    isFeatured: true,
  },
  {
    name: 'Miami',
    propertiesCount: 120,
    image: 'https://code-theme.com/html/findhouses/images/popular-places/9.jpg',
    isFeatured: false,
  },
  {
    name: 'San Francisco',
    propertiesCount: 180,
    image: 'https://code-theme.com/html/findhouses/images/popular-places/8.jpg',
    isFeatured: true,
  },
  {
    name: 'Seattle',
    propertiesCount: 90,
    image: 'https://code-theme.com/html/findhouses/images/popular-places/7.jpg',
    isFeatured: false,
  },
];
const PopularPlaces = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <SectionTitle header="Most Popular" title="Places" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 md:p-5">
        {locations.map((location, index) => (
          <div
            key={index}
            className="max-w-sm overflow-hidden rounded-lg shadow-lg group"
          >
            <a href="#" className="block relative">
              <div className="relative">
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                  src={location.image}
                  alt={`${location.name} skyline`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
                {location.isFeatured && (
                  <div className="absolute top-3  -left-6 bg-black/80 text-white text-xs font-semibold  -rotate-45 px-6 py-1  text-center rounded">
                    Featured
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-2xl font-semibold">{location.name}</h3>
                <p className="mt-2 text-sm">
                  {location.propertiesCount} Properties
                </p>
                <p className="mt-2 text-xs">{formattedDate}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
