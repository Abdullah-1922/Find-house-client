import React from 'react';

export default function SectionTitle({
  header,
  title,
}: {
  header: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-3.5 h-14 rounded bg-gray-800" />
      <div>
        <h2 className="text-sm uppercase font-semibold text-gray-800">{header}</h2>
        <h3 className="text-2xl uppercase font-bold ">{title}</h3>
      </div>
    </div>
  );
}
