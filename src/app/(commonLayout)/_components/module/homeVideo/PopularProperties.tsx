import PropertyCard from '@/components/shared/card/PropertyCard';
import { useGetAllPropertiesQuery } from '@/redux/api/features/property/propertyApi';
import { TProperty } from '@/types';

const PopularProperties = () => {
  const { data } = useGetAllPropertiesQuery(undefined);
  const properties = data?.data as TProperty[];

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
