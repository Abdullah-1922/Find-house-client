"use client";
import SectionTitle from "@/components/ui/sectionTitle";
import { useGetAllPopularPlacesQuery } from "@/redux/api/features/popularPlace/popularPlaceApi";
import { TPopularPlace } from "@/types";
import Image from "next/image";
import PopularPlacesLoading from "./popularPlacesLoading";

const PopularPlaces = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const { data, isLoading } = useGetAllPopularPlacesQuery({});
  const locations = data?.data;
  console.log(locations);

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <SectionTitle header="Most Popular" title="Places" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 md:p-5">
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((_, index) => (
              <PopularPlacesLoading key={index} />
            ))
          : locations?.map((location: TPopularPlace) => (
              <div
                key={location._id}
                className="max-w-sm overflow-hidden rounded-lg shadow-lg group"
              >
                <div className="block relative">
                  <div className="relative">
                    <Image
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                      src={location.images[0]}
                      alt={`${location.location} skyline`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
                    {location.isFeatured && (
                      <div className="absolute top-3  -left-6 bg-black/80 text-white text-xs font-semibold  -rotate-45 px-6 py-1  text-center rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-2xl font-semibold">
                      {location.location}
                    </h3>
                    <p className="mt-2 text-sm">
                      {location.propertyCount} Properties
                    </p>
                    <p className="mt-2 text-xs">{formattedDate}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
