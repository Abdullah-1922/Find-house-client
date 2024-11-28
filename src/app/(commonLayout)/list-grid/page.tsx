'use client';

import dynamic from 'next/dynamic';

const ListGridProperties = dynamic(
  () => import('../_components/module/listGridProperties'),
  {
    ssr: false,
  }
);

const ListGridPage = () => {
  return (
    <div className="mt-5 mb-10">
      <ListGridProperties />
    </div>
  );
};

export default ListGridPage;
