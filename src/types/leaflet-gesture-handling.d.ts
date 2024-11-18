// types/leaflet-gesture-handling.d.ts

import 'leaflet';

declare module 'leaflet' {
  interface Map {
    gestureHandling: {
      enable: () => void;
      disable: () => void;
    };
  }
}
