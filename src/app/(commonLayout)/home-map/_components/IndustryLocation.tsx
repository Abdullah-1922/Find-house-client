"use client";

import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PropertySearchForm from "./PropertySearchForm";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const IndustryLocation: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY", // Replace with your actual API key
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  //   console.log(map);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
      <div className=" absolute top-32 right-20">
        <PropertySearchForm />
      </div>
    </>
  ) : (
    <>
      <div className=" flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    </>
  );
};

export default IndustryLocation;
