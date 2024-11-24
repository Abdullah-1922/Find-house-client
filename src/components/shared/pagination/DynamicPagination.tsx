import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination';

interface DynamicPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DynamicPagination: React.FC<DynamicPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
    }
    console.log('pages', pages, totalPages);
    return pages;
  };

  const isDisabled = (type: 'previous' | 'next') =>
    (type === 'previous' && currentPage === 1) ||
    (type === 'next' && currentPage === totalPages);

  return (
    <Pagination className="text-left mb-4 mt-8 justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={
              isDisabled('previous') ? 'pointer-events-none opacity-50' : ''
            }
            onClick={() =>
              !isDisabled('previous') && onPageChange(currentPage - 1)
            }
          />
        </PaginationItem>
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(Number(page))}
              isActive={currentPage === page}
              className={`${
                currentPage === page &&
                'pointer-events-none opacity-90 bg-gray-800 text-white rounded-full'
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={
              isDisabled('next') ? 'pointer-events-none opacity-50' : ''
            }
            onClick={() => !isDisabled('next') && onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DynamicPagination;
