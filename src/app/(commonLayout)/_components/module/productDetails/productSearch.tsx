'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useGetAllProductsQuery } from '@/redux/api/features/product/productApi';
import { ProductSearchModal } from '../../modal/productSearchModal';

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const { data: searchResults, isLoading } = useGetAllProductsQuery(query, {
    skip: !query,
  });

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setQuery(`searchTerm=${searchTerm}`);
      setModalOpen(true);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-3">Search</h2>
      <div className="flex items-center w-full h-10 relative">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-l-md h-10 border-r-0 w-full focus:outline-none"
          type="search"
          placeholder="Search products"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-800 size-6 w-10 text-white h-10 px-2 rounded-r-md absolute right-0"
        >
          <Search />
        </button>
      </div>
      <ProductSearchModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        results={searchResults?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
}
