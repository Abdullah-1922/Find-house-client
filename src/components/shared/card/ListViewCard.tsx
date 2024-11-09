import { Button } from "@/components/ui/button";
import { TProperty } from "@/types";
import { ImageIcon, Video , Link as LinkIcon ,} from "lucide-react";
import Image from "next/image";


export const ListViewCard = ({ property }: { property: TProperty }) => {
    return (
      <div
        key={property.id}
        className={`bg-white rounded-lg overflow-hidden  lg:flex
        `}
      >
        <div
          className={`relative  "lg:w-[400px] lg:shrink-0" 
          `}
        >
          <Image
            src={property.image}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            style={{ height: "300px" }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {property.featured && (
              <span className="bg-pink-500 text-white px-3 py-1 rounded-md text-sm">
                Featured
              </span>
            )}
            <span className="bg-gray-700/70 text-white px-3 py-1 rounded-md text-sm">
              {property.status}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/90 text-black px-3 py-1 rounded-md text-lg font-bold">
              ${property.price}/mo
            </span>
          </div>
        </div>
        <div className="p-6 flex-1">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{property.title}</h3>
            <p className="text-muted-foreground flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {property.location}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M3 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                  <path d="M15 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                  <path d="M9 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9Z" />
                  <path d="M3 14v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                  <path d="M15 14v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                  <path d="M9 14v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9Z" />
                  <path d="M3 6V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                  <path d="M15 6V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                  <path d="M9 6V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9Z" />
                </svg>
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M9 6h8" />
                  <path d="M5 12h14" />
                  <path d="M9 18h8" />
                </svg>
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
                <span>{property.area} sq ft</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M3 3h18" />
                  <path d="M3 9h18" />
                  <path d="M3 15h18" />
                  <path d="M3 21h18" />
                </svg>
                <span>{property.garages} Garages</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Image
                  src={property.agent.image}
                  alt={property.agent.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-medium">{property.agent.name}</span>
              </div>
              <span className="text-muted-foreground flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
                {property.postedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  