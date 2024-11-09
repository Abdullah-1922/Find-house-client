import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TProperty } from "@/types";
import { ImageIcon, Link2, MapPin, Video } from "lucide-react";
import Image from "next/image";

const GridViewCard = ({ property }: { property: TProperty }) => {
  return (
    <Card className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="relative">
        <Image
          src={property.image}
          alt={property.title}
          width={600}
          height={400}
          className="h-[340px] w-full object-cover"
        />
        <div className="absolute left-4 right-4 top-4 flex justify-between">
          {property.featured && (
            <Badge className="bg-red-500 px-3 py-1 text-white">Featured</Badge>
          )}
          <Badge className="bg-gray-600/90 px-3 py-1 text-white">
            {property.status}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="text-2xl font-bold text-white drop-shadow-md">
            ${property.price.toLocaleString()}/mo
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white/80 p-2 hover:bg-white"
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white/80 p-2 hover:bg-white"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white/80 p-2 hover:bg-white"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{property.title}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-600">
          <MapPin className="mr-1 h-4 w-4" />
          {property.location}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Image
              src="/placeholder.svg?height=16&width=16"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            {property.bedrooms} Bedrooms
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Image
              src="/placeholder.svg?height=16&width=16"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            {property.bathrooms} Bathrooms
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Image
              src="/placeholder.svg?height=16&width=16"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            {property.area} sq ft
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Image
              src="/placeholder.svg?height=16&width=16"
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
            {property.garages} Garages
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3 border-t p-4">
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src={property.agent.image} alt={property.agent.name} />
          <AvatarFallback>{property.agent.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {property.agent.name}
          </span>
          <span className="text-sm text-gray-500">{property.postedTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GridViewCard;
