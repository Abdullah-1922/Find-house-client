'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutGrid, List } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import CalenderSchedule from './CalerderSchedule';
import RequestInquiry from './RequestInquiry';
import ResentProperties from './ResentProperties';
import FeaturedProperties from './FeatureProperties';

const agencies = [
  {
    id: 1,
    name: 'Capital Partners',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-2.jpg',
    listings: 3,
    office: '(234) 0200 17813',
    mobile: '(657) 9854 12095',
    fax: '809 123 0951',
    email: 'info@agent.com',
    agent: {
      name: 'Arling Tracy',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-2.jpg',
    },
  },
  {
    id: 2,
    name: 'Legacy Park',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-1.jpg',
    listings: 5,
    office: '(234) 0200 17813',
    mobile: '(657) 9854 12095',
    fax: '809 123 0951',
    email: 'info@legacy.com',
    agent: {
      name: 'Carle Jhons',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-2.jpg',
    },
  },
  {
    id: 3,
    name: 'Live Property',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-3.jpg',
    listings: 7,
    office: '(234) 0200 17813',
    mobile: '(657) 9854 12095',
    fax: '809 123 0951',
    email: 'info@liveproperty.com',
    agent: {
      name: 'Michael Brown',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-2.jpg',
    },
  },
  {
    id: 4,
    name: 'Dream Estates',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-4.jpg',
    listings: 4,
    office: '(456) 7890 12345',
    mobile: '(876) 5432 10987',
    fax: '809 456 7890',
    email: 'info@dreamestates.com',
    agent: {
      name: 'Sophia Turner',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-1.jpg',
    },
  },
  {
    id: 5,
    name: 'NextGen Realty',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-5.jpg',
    listings: 6,
    office: '(789) 1234 56789',
    mobile: '(654) 3210 98765',
    fax: '809 321 7654',
    email: 'info@nextgenrealty.com',
    agent: {
      name: 'David Smith',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-3.jpg',
    },
  },
  {
    id: 6,
    name: 'Urban Living',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-6.jpg',
    listings: 8,
    office: '(321) 6540 98765',
    mobile: '(987) 6543 21098',
    fax: '809 654 0987',
    email: 'info@urbanliving.com',
    agent: {
      name: 'Emma Wilson',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-4.jpg',
    },
  },
  {
    id: 7,
    name: 'Prime Properties',
    logo: 'https://code-theme.com/html/findhouses/images/partners/ag-7.jpg',
    listings: 10,
    office: '(876) 5432 10987',
    mobile: '(456) 7890 12345',
    fax: '809 876 5432',
    email: 'info@primeproperties.com',
    agent: {
      name: 'Liam Johnson',
      image:
        'https://code-theme.com/html/findhouses/images/testimonials/ts-5.jpg',
    },
  },
];

const ITEMS_PER_PAGE = 6;

export default function OurAgencies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);

  const totalPages = Math.ceil(agencies.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedAgencies = agencies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto px-2 lg:px-4">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-4">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Listings</span>
        </nav>
        <h1 className="mb-8 text-3xl font-bold">Our Agencies</h1>
      </div>

      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-5 w-full">
          {/* Filters */}
          <div className="mb-6 flex flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">
              {agencies.length} Search results
            </p>
            <div className="flex items-center gap-4">
              <Select defaultValue="alphabet">
                <SelectTrigger className="w-[180px] focus:outline-none">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabet">Alphabet</SelectItem>
                  <SelectItem value="listings">Listings</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={isGridView ? 'default' : 'outline'}
                  size="icon"
                  className={`${
                    isGridView
                      ? 'bg-gray-800 hover:bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setIsGridView(true)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={!isGridView ? 'default' : 'outline'}
                  size="icon"
                  className={`${
                    !isGridView
                      ? 'bg-gray-800 hover:bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setIsGridView(false)}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Agency Grid */}
          <div
            className={`mb-8 grid gap-6 ${
              isGridView ? 'md:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {paginatedAgencies.map((agency) => (
              <Card
                key={agency.id}
                className={`${isGridView ? 'flex flex-col' : 'flex flex-row'}`}
              >
                <CardHeader className="relative">
                  <Badge className="absolute left-4 top-4 py-2 px-3 rounded bg-gray-800 hover:bg-gray-900">
                    {agency.listings} Listings
                  </Badge>
                  <div className="flex justify-center">
                    <Image
                      src={agency.logo}
                      alt={agency.name}
                      width={200}
                      height={200}
                      className="h-56 w-full object-contain"
                    />
                  </div>
                </CardHeader>
                <div
                  className={`${
                    isGridView ? 'flex flex-col' : 'flex flex-col mt-5'
                  } w-full`}
                >
                  <CardContent className="space-y-4">
                    <h3 className="text-xl font-semibold">{agency.name}</h3>
                    <div className="space-y-2 text-sm">
                      <p>Office: {agency.office}</p>
                      <p>Mobile: {agency.mobile}</p>
                      <p>Fax: {agency.fax}</p>
                      <p>Email: {agency.email}</p>
                    </div>
                    <hr />
                  </CardContent>
                  <CardFooter className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={agency.agent.image}
                          alt={agency.agent.name}
                        />
                        <AvatarFallback>{agency.agent.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{agency.agent.name}</span>
                    </div>
                    <Button
                      size={'sm'}
                      variant={'link'}
                      className="text-gray-800 hover:text-gray-900"
                    >
                      View My Listing
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        {/* Sidebar Forms */}
        <div className="flex flex-col gap-5 w-[50%]">
          {/* Schedule Tour */}
          <CalenderSchedule />
          {/* Request Inquiry */}
          <RequestInquiry />
          {/* Resent Properties */}
          <ResentProperties />
          {/* Featured Properties */}
          <FeaturedProperties />
        </div>
      </div>
    </div>
  );
}
