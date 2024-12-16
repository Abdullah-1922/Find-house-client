import React from 'react';

export default function SectionTitle({
  header,
  title,
}: {
  header: string;
  title: string;
}) {
  return (
    <div className="flex items-start space-x-4 py-4 md:pt-20 pt-16">
      <div className="w-4 h-16 bg-gray-800 rounded"></div>
      <div>
        <p className="text-lg font-semibold text-black mb-1">{header}</p>
        <h2 className="text-3xl font-bold text-gray-800 ">{title}</h2>
      </div>
    </div>
  );
}
