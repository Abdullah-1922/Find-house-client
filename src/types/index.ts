export type TProperty ={
    id: number;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    garages: number;
    status: "For Sale" | "For Rent";
    featured: boolean;
    agent: {
      name: string;
      image: string;
    };
    postedTime: string;
    image: string;
  }