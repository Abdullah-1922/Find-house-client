'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProperLocation({
  latitude = 421325,
  Longitude = 237542,
}: {
  latitude?: number;
  Longitude?: number;
}) {
  useEffect(() => {
    // Initialize map
    const map = L.map('map', {
      center: [latitude, Longitude],
      zoom: 6,
      scrollWheelZoom: false, // Disable scroll zoom by default
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom marker icon
    const customIcon = new L.DivIcon({
      className: 'leaflet-div-icon',
      html: `
      <div class=" flex items-center justify-center hover:scale-110 transition-transform duration-300 -mt-2 bg-white">
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/location-8631201-7174337.png?f=webp&w=256" class="w-10 h-10 object-cover" alt="Home icon" />
      </div>
    `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Add marker
    L.marker([43.0, -75.5], { icon: customIcon }).addTo(map);

    // Enable zoom on Ctrl + Scroll
    map.on('keydown', (e) => {
      if (e.originalEvent.ctrlKey) {
        map.scrollWheelZoom.enable();
      }
    });

    map.on('keyup', () => {
      map.scrollWheelZoom.disable();
    });

    // Enable zoom for touch devices (two-finger zoom)
    map.touchZoom.enable();
    map.doubleClickZoom.disable();

    // Add zoom controls
    map.zoomControl.setPosition('topleft');

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return (
    <Card className="w-full bg-background rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Location</CardTitle>
        <div className="h-1 w-12 bg-gray-800 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px]" id="map" />
        <style jsx global>{`
          .leaflet-container {
            z-index: 1;
            border-radius: 0 0 0.5rem 0.5rem;
          }
          .custom-marker {
            background: transparent;
            border: none;
          }
        `}</style>
      </CardContent>
    </Card>
  );
}
