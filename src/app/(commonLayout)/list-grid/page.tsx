'use client';

import Spinner from '@/components/ui/spinner';
import ListGridProperties from '../_components/module/listGridProperties';
import { Suspense } from 'react';

const ListGridPage = () => {
  return (
    <div className="mt-5 mb-10 pt-20">
      <Suspense fallback={<Spinner />}>
        <ListGridProperties />
      </Suspense>
    </div>
  );
};

export default ListGridPage;
