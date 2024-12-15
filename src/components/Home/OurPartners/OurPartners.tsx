'use client';

import React from 'react';
import Image from 'next/image';

// Dynamic data for partner images
const partnersData = [
  'https://code-theme.com/html/findhouses/images/partners/13.jpg',
  'https://code-theme.com/html/findhouses/images/partners/11.jpg',
  'https://code-theme.com/html/findhouses/images/partners/12.jpg',
  'https://code-theme.com/html/findhouses/images/partners/16.jpg',
  'https://code-theme.com/html/findhouses/images/partners/15.jpg',
  'https://code-theme.com/html/findhouses/images/partners/14.jpg',
];

const OurPartners = () => {
  return (
    <div
      className="pb-20"
      style={{
        backgroundImage:
          'url(https://code-theme.com/html/findhouses/images/bg/bg-white-3.png)',
      }}
    >
      <div>
        <h2 className="text-center text-4xl font-bold pt-20">Our Partners</h2>
        <p className="text-center text-gray-500">
          The Companies That Represent Us.
        </p>
      </div>

      <div
        className="max-w-7xl mx-auto"
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          paddingTop: '2.5rem',
        }}
      >
        <div
          className=""
          style={{
            display: 'flex',
            animation: 'scroll 20s linear infinite',
          }}
        >
          {partnersData.map((imageUrl, index) => (
            <div
              key={index}
              style={{ padding: '0.25rem', marginRight: '1rem' }}
            >
              <Image
                className="w-32"
                src={imageUrl}
                alt={`Partner ${index + 1}`}
                width={1000}
                height={1000}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for keyframes */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default OurPartners;
