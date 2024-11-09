"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

const IndustryLocation = () => {
  const containerStyle = {
    width: "100%",
    height: "80vh",
  };

  const center = {
    lat: -34.397,
    lng: -150.644,
  };
  return (
    <>
      <LoadScript googleMapsApiKey="">
        <GoogleMap 
        mapContainerStyle={containerStyle} 
        center={center} 
        zoom={14}>
          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default IndustryLocation;
