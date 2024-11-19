import React from "react";
import PropertyCarousel from "./propertyCarousel";
import CalenderSchedule from "../agencies/CalerderSchedule";
import PropertyDetails from "./propertyDetails";
import PropertyDescription from "./propertyDescription";
import WhatsNearby from "./whatsNearby";
import AgentInformation from "./agentInformation";
import FloorPlan from "./floorPlan";
import PropertyVideo from "./propertyVideo";
import FeaturedProperties from "../agencies/FeatureProperties";
import ResentProperties from "../agencies/ResentProperties";
import SpecialOfTheDay from "./specialOfTheDay";
import ProperLocation from "./propertyLocation";
import PopularTags from "./PopularTags";
import ResentPropertySlider from "@/app/(commonLayout)/home-map/_components/resentPropertySlider";
import { TProperty } from "@/types/property/property.type";

export default function Property() {
  const property: TProperty = {
    _id: "67372a4c5c0eade732d63cf8",
    author: {
      _id: "673704d3db3cdc44c18d7b6b",
      firstName: "Abdullah Al Kafi7",
      secondName: "Al Kafi",
      auth: "673704d3db3cdc44c18d7b69",
      image:
        "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      role: "user",
      paymentHistory: [],
      property: ["67372a4c5c0eade732d63cf8"],
      createdAt: "2024-11-15T08:22:43.986Z",
      updatedAt: "2024-11-15T11:02:36.369Z",
      __v: 0,
    },
    ownedBy: {
      _id: "673704d3db3cdc44c18d7b6b",
      firstName: "Abdullah Al Kafi7",
      secondName: "Al Kafi",
      auth: "673704d3db3cdc44c18d7b69",
      image:
        "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      role: "user",
      paymentHistory: [],
      property: ["67372a4c5c0eade732d63cf8"],
      createdAt: "2024-11-15T08:22:43.986Z",
      updatedAt: "2024-11-15T11:02:36.369Z",
      __v: 0,
    },
    status: "active",
    feedback: [],
    title: "Modern Apartment in Downtown4",
    description:
      "A spacious modern apartment located in the heart of the city with all the necessary amenities2.",
    category: "rent",
    type: "apartment",
    rooms: 3,
    price: 1500,
    area: 1200,
    images: [
      "https://code-theme.com/html/findhouses/images/feature-properties/fp-1.jpg",
      "https://code-theme.com/html/findhouses/images/feature-properties/fp-2.jpg",
    ],
    location: {
      address: "1234 Main Street",
      city: "New York",
      state: "NY",
      country: "USA",
      latitude: "40.712776",
      longitude: "-74.005974",
    },
    extraInfo: {
      age: "0-10",
      rooms: 3,
      bathrooms: 2,
      _id: "67372a4c5c0eade732d63cf9",
    },
    features: [
      "Air Conditioning",
      "Central Heating",
      "TV Cable & WIFI",
      "Laundry Room",
    ],
    contactInfo: {
      name: "John Doe",
      userName: "johndoe123",
      phone: "+1 123 456 7890",
      email: "johndoe@example.com",
      _id: "67372a4c5c0eade732d63cfa",
    },
    createdAt: "2024-11-15T11:02:36.133Z",
    updatedAt: "2024-11-17T11:04:31.602Z",
    comment: ["673896e4ceacaa8f003fa53c", "6739cdbf4cf3dd5b02aae3c1"],
  };

  const pricePerSqFt = property?.price / property?.area;
  const location = `${property?.location.address}, ${property?.location.city}, ${property?.location.state}, ${property?.location.country}`;
  return (
    <div>
      <PropertyCarousel />
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex gap-5 w-full my-8">
          <div className="flex flex-col gap-5 w-full space-y-5">
            <PropertyDescription
              price={property.price}
              pricePerSqFt={pricePerSqFt}
              description={property.description}
              location={location}
              title={property.title}
            />
            <PropertyDetails amenities={property.features} />
            <FloorPlan />
            <WhatsNearby />
            <PropertyVideo />
            <ProperLocation />
          </div>
          {/* Sidebar Forms */}
          <div className="flex flex-col gap-5 w-[50%] space-y-5">
            {/* Schedule Tour */}
            <CalenderSchedule />
            <AgentInformation />
            <ResentProperties />
            <FeaturedProperties />
            <SpecialOfTheDay />
            <PopularTags />
          </div>
        </div>
      </div>
      <ResentPropertySlider />
    </div>
  );
}
