"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Place {
  name: string;
  location: string;
  coordinates: [number, number];
  category: string;
  date: string;
  notes: string;
}

interface CustomTravelMapProps {
  places: Place[];
  categories: Record<string, string>;
}

// Fix for default marker icon in Next.js
const createIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

export default function CustomTravelMap({ places, categories }: CustomTravelMapProps) {
  useEffect(() => {
    // Fix for leaflet default icon issue
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  // Calculate center based on places
  const center: [number, number] = places.length > 0
    ? [
        places.reduce((sum, p) => sum + p.coordinates[1], 0) / places.length,
        places.reduce((sum, p) => sum + p.coordinates[0], 0) / places.length,
      ]
    : [39.8283, -98.5795]; // US center

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place, index) => (
        <Marker
          key={index}
          position={[place.coordinates[1], place.coordinates[0]]}
          icon={createIcon(categories[place.category] || "#6b7280")}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold text-gray-900">{place.name}</h3>
              <p className="text-gray-600">{place.location}</p>
              {place.date && <p className="text-gray-500 text-xs mt-1">{place.date}</p>}
              {place.notes && <p className="text-gray-600 text-xs mt-1">{place.notes}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
