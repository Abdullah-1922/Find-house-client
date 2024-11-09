import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";

const MeetOurAgents = () => {
    const agents = [
        {
          id: 1,
          name: "Carls Jhons",
          title: "Real Estate Agent",
          image: "https://code-theme.com/html/findhouses/images/team/t-5.jpg",
          socialLinks: {
            facebook: "URL_to_Carls_Jhons_facebook",
            twitter: "URL_to_Carls_Jhons_twitter",
            instagram: "URL_to_Carls_Jhons_instagram",
            linkedin: "URL_to_Carls_Jhons_linkedin"
          }
        },
        {
          id: 2,
          name: "Arling Tracy",
          title: "Real Estate Agent",
          image: "https://code-theme.com/html/findhouses/images/team/t-6.jpg",
          socialLinks: {
            facebook: "URL_to_Arling_Tracy_facebook",
            twitter: "URL_to_Arling_Tracy_twitter",
            instagram: "URL_to_Arling_Tracy_instagram",
            linkedin: "URL_to_Arling_Tracy_linkedin"
          }
        },
        {
          id: 3,
          name: "Mark Web",
          title: "Real Estate Agent",
          image: "https://code-theme.com/html/findhouses/images/team/t-7.jpg",
          socialLinks: {
            facebook: "URL_to_Mark_Web_facebook",
            twitter: "URL_to_Mark_Web_twitter",
            instagram: "URL_to_Mark_Web_instagram",
            linkedin: "URL_to_Mark_Web_linkedin"
          }
        },
        {
          id: 4,
          name: "Katy Grace",
          title: "Real Estate Agent",
          image: "https://code-theme.com/html/findhouses/images/team/t-8.jpg",
          socialLinks: {
            facebook: "URL_to_Katy_Grace_facebook",
            twitter: "URL_to_Katy_Grace_twitter",
            instagram: "URL_to_Katy_Grace_instagram",
            linkedin: "URL_to_Katy_Grace_linkedin"
          }
        },
        {
          id: 5,
          name: "Chris Melo",
          title: "Real Estate Agent",
          image: "https://code-theme.com/html/findhouses/images/team/team-image-2.jpg",
          socialLinks: {
            facebook: "URL_to_Chris_Melo_facebook",
            twitter: "URL_to_Chris_Melo_twitter",
            instagram: "URL_to_Chris_Melo_instagram",
            linkedin: "URL_to_Chris_Melo_linkedin"
          }
        },
        {
          id: 6,
          name: "Nina Thomas",
          title: "Real Estate Agent",
          image: "https://code-theme.com/html/findhouses/images/team/team-image-7.jpg",
          socialLinks: {
            facebook: "URL_to_Chris_Melo_facebook",
            twitter: "URL_to_Chris_Melo_twitter",
            instagram: "URL_to_Chris_Melo_instagram",
            linkedin: "URL_to_Chris_Melo_linkedin"
          }
        }
      ];
    return (
        <div
        className=" h-[700px]"
        style={{
          backgroundImage:
            "url(https://code-theme.com/html/findhouses/images/bg/bg-white-3.png)",
        }}
      >
        <div className="flex items-center space-x-4 p-4 max-w-md lg:ml-20 pt-20">
          <div className="w-4 h-16 bg-gray-800 rounded"></div>
          <div>
            <p className="text-lg font-bold text-black mb-1">MEET OUR</p>
            <h2 className="text-3xl font-extrabold text-gray-800">Agents</h2>
          </div>
        </div>
    <div className="flex justify-center mt-20">
    <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-7xl"
      >
        <CarouselContent>
          {agents.map((agent, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <Card className="w-[300px] overflow-hidden bg-white">
      <div className="relative">
        <Image
          alt="Profile photo"
          className="w-full object-cover"
          height={300}
          src={agent.image}
          style={{
            aspectRatio: "300/300",
            objectFit: "cover",
          }}
          width={300}
        />
        <div className="absolute right-0 top-0 flex flex-col gap-1 p-2">
          <Button
            className="h-8 w-8 bg-slate-700 p-0 hover:bg-slate-600"
            size="icon"
            variant="secondary"
          >
            <Facebook className="h-4 w-4 text-white" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button
            className="h-8 w-8 bg-slate-700 p-0 hover:bg-slate-600"
            size="icon"
            variant="secondary"
          >
            <Twitter className="h-4 w-4 text-white" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button
            className="h-8 w-8 bg-slate-700 p-0 hover:bg-slate-600"
            size="icon"
            variant="secondary"
          >
            <Instagram className="h-4 w-4 text-white" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button
            className="h-8 w-8 bg-slate-700 p-0 hover:bg-slate-600"
            size="icon"
            variant="secondary"
          >
            <Linkedin className="h-4 w-4 text-white" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </div>
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="text-xl font-semibold">Arling Tracy</h3>
        <p className="text-sm text-muted-foreground">Real Estate Agent</p>
      </CardContent>
    </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="w-16 h-16 bg-white text-gray-500 text-2xl hover:bg-gray-400 text-xl hover:text-white font-bold" />
        <CarouselNext className="w-16 h-16 bg-white text-gray-500 text-2xl hover:bg-gray-400 text-xl hover:text-white" />
      </Carousel>
    </div>
      </div>
    );
};

export default MeetOurAgents;