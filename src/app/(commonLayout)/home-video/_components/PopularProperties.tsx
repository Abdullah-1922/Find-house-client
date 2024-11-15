import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, Car, Link2, MessageSquare, ImageIcon } from 'lucide-react'
import Image from "next/image"


const PopularProperties = () => {
    return (
        <div className="mt-20">
       <div
  className="h-[600px] pt-20 relative overflow-hidden"
  style={{
    backgroundImage: "url(https://code-theme.com/html/findhouses/images/blog/b-11.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay for blur effect */}
  <div
    className="absolute inset-0"
    style={{
      backdropFilter: "blur(8px)",  // Adjust the blur intensity here
      backgroundColor: "rgba(0, 0, 0, 0.3)",  // Optional: dark overlay to enhance text readability
    }}
  ></div>

<div>
            <div className="flex items-center gap-10 mt-12 justify-center">
              <div className="z-10">
                <h1 className="text-3xl font-bold text-white my-5">Popular Properties</h1>
                <p className="text-white mb-2">We Help you find the best places and offer near</p>
                <p className="text-white mb-2">you. Bring to the table win-win survival strategies</p>
                <p className="text-white">to ensure proactive domination going forward.</p>
                <button className="mt-6 rounded-md bg-gray-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700">
                Get Started
              </button>
              </div>
          <Card className="z-10 w-80">
            <CardContent className="p-0">
              <div className="relative">
                <Badge className="absolute left-2 top-2 bg-pink-500 text-white">Featured</Badge>
                <Badge className="absolute right-2 top-2 bg-gray-800/80 text-white">For Sale</Badge>
                <Image
                  src="https://code-theme.com/html/findhouses/images/blog/b-11.jpg"
                  alt="Luxury Villa Interior"
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Real House Luxury Villa</h3>
                    <p className="text-xl font-bold">$9,000/mo</p>
                  </div>
                  <p className="text-gray-500">Est St, 77 - Central Park South, NYC</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">6 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">3 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">720 sq ft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">2 Garages</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="z-10 w-80">
            <CardContent className="p-0">
              <div className="relative">
                <Badge className="absolute left-2 top-2 bg-pink-500 text-white">Featured</Badge>
                <Badge className="absolute right-2 top-2 bg-gray-800/80 text-white">For Rent</Badge>
                <Image
                  src="https://code-theme.com/html/findhouses/images/feature-properties/fp-10.jpg"
                  alt="Luxury Villa Exterior"
                  width={400}
                  height={300}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Real House Luxury Villa</h3>
                    <p className="text-xl font-bold">$3,000/mo</p>
                  </div>
                  <p className="text-gray-500">Est St, 77 - Central Park South, NYC</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">6 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">3 Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">720 sq ft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">2 Garages</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> 
        </div>
  
</div>

      
        </div>
    );
};

export default PopularProperties;