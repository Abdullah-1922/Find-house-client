import GridViewCard from "@/components/shared/card/GridViewCard";
import { TProperty } from "@/types";


const RecentProject = () => {

    const properties: TProperty[] = [
      {
        id: 1,
        title: "Real House Luxury Villa",
        price: 9000,
        location: "Est St, 77 - Central Park South, NYC",
        bedrooms: 6,
        bathrooms: 3,
        area: 720,
        garages: 2,
        status: "For Sale",
        featured: true,
        agent: {
          name: "Lisa Jhonson",
          image: "/placeholder.svg?height=40&width=40",
        },
        postedTime: "2 months ago",
        image: "https://code-theme.com/html/findhouses/images/blog/b-1.jpg",
      },
      {
        id: 2,
        title: "Real House Luxury Villa",
        price: 8000,
        location: "Est St, 77 - Central Park South, NYC",
        bedrooms: 6,
        bathrooms: 3,
        area: 720,
        garages: 2,
        status: "For Rent",
        featured: false,
        agent: {
          name: "Karl Smith",
          image: "/placeholder.svg?height=40&width=40",
        },
        postedTime: "2 months ago",
        image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
      },
      {
        id: 3,
        title: "Real House Luxury Villa",
        price: 9000,
        location: "Est St, 77 - Central Park South, NYC",
        bedrooms: 6,
        bathrooms: 3,
        area: 720,
        garages: 2,
        status: "For Sale",
        featured: false,
        agent: {
          name: "katy Teddy",
          image: "/placeholder.svg?height=40&width=40",
        },
        postedTime: "2 months ago",
        image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
      },
      {
        id: 3,
        title: "Real House Luxury Villa",
        price: 9000,
        location: "Est St, 77 - Central Park South, NYC",
        bedrooms: 6,
        bathrooms: 3,
        area: 720,
        garages: 2,
        status: "For Sale",
        featured: false,
        agent: {
          name: "katy Teddy",
          image: "/placeholder.svg?height=40&width=40",
        },
        postedTime: "2 months ago",
        image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
      },
      {
        id: 3,
        title: "Real House Luxury Villa",
        price: 9000,
        location: "Est St, 77 - Central Park South, NYC",
        bedrooms: 6,
        bathrooms: 3,
        area: 720,
        garages: 2,
        status: "For Sale",
        featured: false,
        agent: {
          name: "katy Teddy",
          image: "/placeholder.svg?height=40&width=40",
        },
        postedTime: "2 months ago",
        image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
      },
      {
        id: 3,
        title: "Real House Luxury Villa",
        price: 9000,
        location: "Est St, 77 - Central Park South, NYC",
        bedrooms: 6,
        bathrooms: 3,
        area: 720,
        garages: 2,
        status: "For Sale",
        featured: false,
        agent: {
          name: "katy Teddy",
          image: "/placeholder.svg?height=40&width=40",
        },
        postedTime: "2 months ago",
        image: "https://code-theme.com/html/findhouses/images/blog/b-11.jpg",
      },
    
    ];
    return (
<div className="mb-20">
  <div>
    <h2 className="text-center text-4xl font-bold pt-20">Featured Properties</h2>
    <p className="text-center text-gray-500">We provide full service at every step.</p>
  </div>

  <div className="flex justify-center mt-10">
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
    {properties.map((property) => (
      <GridViewCard key={property.id} property={property} />
    ))}
  </div>
  </div>
</div>

    );
};

export default RecentProject;