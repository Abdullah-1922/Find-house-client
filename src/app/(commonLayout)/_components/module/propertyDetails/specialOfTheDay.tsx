import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

export default function SpecialOfTheDay() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-gray-800">Special of the day</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {/* Property Details Section */}
        <Image
          src={
            'https://code-theme.com/html/findhouses/images/single-property/banner.jpg'
          }
          alt="floorImage"
          width={1200}
          height={1200}
          className="w-full h-full"
        />
      </CardContent>
    </Card>
  );
}
