import PropertyCard from '@/components/shared/card/PropertyCard';
import { useGetAllPropertiesQuery } from '@/redux/api/features/property/propertyApi';
import { TProperty } from '@/types';

const RecentProject = () => {
  const { data } = useGetAllPropertiesQuery(undefined);
  const properties = data?.data as TProperty[];
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
