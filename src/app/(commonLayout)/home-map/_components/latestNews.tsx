'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import SectionTitle from '@/components/ui/sectionTitle';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'The Real Estate News',
    date: 'Jun 23, 2023',
    author: 'By Admin',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://code-theme.com/html/findhouses/images/blog/b-1.jpg',
    likes: 24,
    comments: 14,
    shares: 12,
  },
  {
    id: '2',
    title: 'The Real Estate News',
    date: 'Jun 23, 2023',
    author: 'By Admin',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://code-theme.com/html/findhouses/images/blog/b-3.jpg',
    likes: 24,
    comments: 14,
    shares: 12,
  },
  {
    id: '3',
    title: 'The Real Estate News',
    date: 'Jun 23, 2023',
    author: 'By Admin',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://code-theme.com/html/findhouses/images/blog/b-2.jpg',
    likes: 24,
    comments: 14,
    shares: 12,
  },
  {
    id: '4',
    title: 'The Real Estate News',
    date: 'Jun 23, 2023',
    author: 'By Admin',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://code-theme.com/html/findhouses/images/blog/b-4.jpg',
    likes: 24,
    comments: 14,
    shares: 12,
  },
];

const MotionCard = motion(Card);

const NewsCard: React.FC<{ article: NewsArticle; index: number }> = ({
  article,
  index,
}) => {
  return (
    <MotionCard
      className="overflow-hidden md:flex gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <motion.div className="relative h-48 md:h-full w-full">
        <Image
          src={article.image}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </motion.div>
      <div className="md:flex flex-col">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <p className="text-sm text-gray-500">
            {article.date} {article.author}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            variant="link"
            className="p-0 h-auto font-semibold text-blue-600"
          >
            Read more...
          </Button>
          <div className="flex space-x-4">
            <motion.button
              className="flex items-center text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-xs">{article.likes}</span>
            </motion.button>
            <motion.button
              className="flex items-center text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">{article.comments}</span>
            </motion.button>
            <motion.button
              className="flex items-center text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4 mr-1" />
              <span className="text-xs">{article.shares}</span>
            </motion.button>
          </div>
        </CardFooter>
      </div>
    </MotionCard>
  );
};

export default function LatestNews() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <SectionTitle header="LATEST" title="NEWS" />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
        {newsArticles.map((article, index) => (
          <NewsCard key={article.id} article={article} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
