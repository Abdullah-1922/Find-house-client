'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import SectionTitle from '@/components/ui/sectionTitle';
import { Button } from '@/components/ui/button';

interface Agent {
  name: string;
  title: string;
  image: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

const agents: Agent[] = [
  {
    name: 'Carlo Jhons',
    title: 'Real Estate Agent',
    image: 'https://code-theme.com/html/findhouses/images/team/t-5.jpg',
    socials: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Arling Tracy',
    title: 'Real Estate Agent',
    image: 'https://code-theme.com/html/findhouses/images/team/t-7.jpg',
    socials: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Mark Web',
    title: 'Real Estate Agent',
    image: 'https://code-theme.com/html/findhouses/images/team/t-6.jpg',
    socials: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Katy Grobe',
    title: 'Real Estate Agent',
    image: 'https://code-theme.com/html/findhouses/images/team/t-7.jpg',
    socials: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
    },
  },
];

const AgentCard: React.FC<{ agent: Agent; index: number }> = ({
  agent,
  index,
}) => {
  return (
    <motion.div
      className="relative rounded-lg shadow-lg overflow-hidden h-[300px] group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image Container with Scaling on Hover */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={agent.image}
          alt={agent.name}
          width={500}
          height={500}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 opacity-80"
        />
      </div>

      {/* Info Overlay with Hover Transition */}
      <div className="absolute bottom-5 flex flex-col justify-end p-4 items-center transition-all duration-300 group-hover:-translate-y-16 h-[100px] w-full bg-white">
        <h3 className="text-lg font-semibold text-black">{agent.name}</h3>
        <p className="text-gray-600">{agent.title}</p>
      </div>

      {/* Social Links and Button */}
      <div className="absolute inset-0 flex flex-col justify-end items-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="mt-2 flex space-x-2">
          {agent.socials?.facebook && (
            <motion.a
              href={agent.socials.facebook}
              className="text-blue-600"
              whileHover={{ scale: 1.2 }}
            >
              <Facebook className="h-5 w-5" />
            </motion.a>
          )}
          {agent.socials?.twitter && (
            <motion.a
              href={agent.socials.twitter}
              className="text-blue-400"
              whileHover={{ scale: 1.2 }}
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
          )}
          {agent.socials?.instagram && (
            <motion.a
              href={agent.socials.instagram}
              className="text-pink-600"
              whileHover={{ scale: 1.2 }}
            >
              <Instagram className="h-5 w-5" />
            </motion.a>
          )}
        </div>
        <Button size={'sm'} className="text-black mt-2" variant={'link'}>
          VIEW PROFILE
        </Button>
      </div>
    </motion.div>
  );
};

export default function MeetOurAgents() {
  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4">
      <SectionTitle header="MEET OUR" title="TEAM" />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {agents.map((agent, index) => (
          <AgentCard key={agent.name} agent={agent} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
