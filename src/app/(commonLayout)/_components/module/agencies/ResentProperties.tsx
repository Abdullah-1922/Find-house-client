import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPropertiesQuery } from "@/redux/api/features/property/propertyApi";
import Spinner from "@/components/ui/spinner";
import { TProperty } from "@/types";
import Link from "next/link";

export default function ResentProperties() {
  const { data, isLoading } = useGetAllPropertiesQuery(`limit=${3}`);
  const properties = data?.data;
  if (isLoading) return <Spinner />;
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-gray-800"'>Recent Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property: TProperty) => (
            <div key={property.id} className="flex items-center gap-4">
              <Link href={`/all-properties/${property._id}`}>
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  width={100}
                  height={75}
                  className="rounded-lg object-cover"
                />
              </Link>
              <div>
                <Link href={`/all-properties/${property._id}`}>
                  <h3 className="font-medium">{property.title}</h3>
                </Link>
                <p className="text-lg font-semibold text-primary">
                  ${property.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
