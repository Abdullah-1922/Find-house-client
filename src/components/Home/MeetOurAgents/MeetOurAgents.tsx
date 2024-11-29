'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SectionTitle from '@/components/ui/sectionTitle';
import { useGetRoleBasedUserQuery } from '@/redux/api/features/users/userApi';
import { TUser } from '@/types';

const MeetOurAgents = () => {
  const {
    data: agentData,
    isFetching,
    error,
  } = useGetRoleBasedUserQuery(`agent`);

  if (isFetching) {
    return <p>Loading agents...</p>;
  }

  if (error) {
    return <p>Failed to load agents. Please try again later.</p>;
  }

  const allAgents = agentData?.data as TUser[];

  return (
    <div
      className="h-[700px]"
      style={{
        backgroundImage:
          'url(https://code-theme.com/html/findhouses/images/bg/bg-white-3.png)',
      }}
    >
      <div className="max-w-7xl px-2 md:px-4 mx-auto">
        <SectionTitle header="Meet Our" title="Agents" />
        <Carousel
          opts={{
            align: 'start',
          }}
          className="max-w-7xl"
        >
          <CarouselContent>
            {allAgents.map((agent) => (
              <CarouselItem
                key={agent._id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <Card className="w-[300px] overflow-hidden bg-white">
                  <div className="relative">
                    <Image
                      alt={`${agent.firstName} ${agent.secondName}`}
                      className="w-full object-cover"
                      height={300}
                      src={agent.image || '/default-avatar.png'}
                      style={{
                        aspectRatio: '300/300',
                        objectFit: 'cover',
                      }}
                      width={300}
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-xl font-semibold">
                      {agent.firstName} {agent.secondName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {agent.role === 'agent'
                        ? 'Real Estate Agent'
                        : agent.role}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="w-16 h-16 bg-white text-gray-500hover:bg-gray-400 text-xl hover:text-white font-bold" />
          <CarouselNext className="w-16 h-16 bg-white text-gray-500 hover:bg-gray-400 text-xl hover:text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default MeetOurAgents;
