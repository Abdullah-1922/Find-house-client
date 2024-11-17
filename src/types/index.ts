interface TAgent {
  name: string;
  image: string;
}

export interface TProperty {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  garages: number;
  status: 'For Sale' | 'For Rent';
  featured: boolean;
  agent: TAgent;
  postedTime: string;
  imageUrl: string;
}
