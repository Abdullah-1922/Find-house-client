import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SectionTitle from '@/components/ui/sectionTitle';
const RecentProperties = () => {
  const properties = [
    {
      title: 'Family Apartment',
      price: '$230,000',
      beds: 6,
      baths: 3,
      sqft: 720,
    },
    { title: 'Luxury Villa', price: '$450,000', beds: 5, baths: 4, sqft: 850 },
    { title: 'Modern Condo', price: '$180,000', beds: 3, baths: 2, sqft: 600 },
    {
      title: 'Suburban House',
      price: '$320,000',
      beds: 4,
      baths: 3,
      sqft: 780,
    },
    { title: 'Beach House', price: '$550,000', beds: 4, baths: 3, sqft: 900 },
    {
      title: 'Mountain Cabin',
      price: '$275,000',
      beds: 3,
      baths: 2,
      sqft: 650,
    },
  ];
  return (
    <div
      className="h-[700px]"
      style={{
        backgroundImage:
          'url(https://code-theme.com/html/findhouses/images/bg/bg-white-3.png)',
      }}
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <SectionTitle header="Resent" title="Properties" />
        <div className="flex justify-center mt-20">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="max-w-7xl mx-auto"
          >
            <CarouselContent>
              {properties.map((property, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] w-">
                    <Image
                      width={1000}
                      height={1000}
                      alt={`${property.title} Interior`}
                      className="h-full w-full object-cover"
                      src={`https://code-theme.com/html/findhouses/images/interior/p-${
                        index + 1
                      }.jpg`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className="absolute bottom-0 left-0 p-5 text-white">
                      <h3 className="text-2xl font-bold">{property.title}</h3>
                      <p className="text-xl font-semibold">{property.price}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span>{property.beds} Bed</span>
                        <span className="text-white/60">|</span>
                        <span>{property.baths} Bath</span>
                        <span className="text-white/60">|</span>
                        <span>{property.sqft} sq ft</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-16 h-16 hidden md:block bg-white text-gray-500 text-2xl" />
            <CarouselNext className="w-16 h-16 hidden md:block bg-white text-gray-500 text-2xl" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default RecentProperties;
