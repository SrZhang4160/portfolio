"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { StateData } from "@/lib/content";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface MapMessage {
  id: string;
  name: string;
  message: string;
  stateId: string;
  createdAt: string;
}

interface TravelMapProps {
  states: StateData[];
  onStateClick: (stateId: string, stateName: string) => void;
  messages: MapMessage[];
}

// Map state names from TopoJSON to our state IDs
const stateNameToId: { [key: string]: string } = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "District of Columbia": "DC",
};

// Approximate center coordinates for each state (for sticker placement)
const stateCoordinates: { [key: string]: [number, number] } = {
  AL: [-86.9023, 32.3182],
  AK: [-153.4937, 64.2008],
  AZ: [-111.0937, 34.0489],
  AR: [-92.3731, 34.9697],
  CA: [-119.4179, 36.7783],
  CO: [-105.3111, 39.0598],
  CT: [-72.7554, 41.5978],
  DE: [-75.5277, 38.9108],
  FL: [-81.5158, 27.6648],
  GA: [-83.5002, 32.1656],
  HI: [-155.5828, 19.8968],
  ID: [-114.7420, 44.0682],
  IL: [-89.3985, 40.6331],
  IN: [-86.1349, 40.2672],
  IA: [-93.0977, 41.8780],
  KS: [-98.4842, 39.0119],
  KY: [-84.2700, 37.8393],
  LA: [-91.9623, 30.9843],
  ME: [-69.4455, 45.2538],
  MD: [-76.6413, 39.0458],
  MA: [-71.3824, 42.4072],
  MI: [-85.6024, 44.3148],
  MN: [-94.6859, 46.7296],
  MS: [-89.3985, 32.3547],
  MO: [-91.8318, 37.9643],
  MT: [-110.3626, 46.8797],
  NE: [-99.9018, 41.4925],
  NV: [-116.4194, 38.8026],
  NH: [-71.5724, 43.1939],
  NJ: [-74.4057, 40.0583],
  NM: [-105.8701, 34.5199],
  NY: [-75.4999, 43.0000],
  NC: [-79.0193, 35.7596],
  ND: [-101.0020, 47.5515],
  OH: [-82.9071, 40.4173],
  OK: [-97.0929, 35.0078],
  OR: [-120.5542, 43.8041],
  PA: [-77.1945, 41.2033],
  RI: [-71.4774, 41.5801],
  SC: [-81.1637, 33.8361],
  SD: [-99.9018, 43.9695],
  TN: [-86.5804, 35.5175],
  TX: [-99.9018, 31.9686],
  UT: [-111.0937, 39.3210],
  VT: [-72.5778, 44.5588],
  VA: [-78.6569, 37.4316],
  WA: [-120.7401, 47.7511],
  WV: [-80.4549, 38.5976],
  WI: [-89.6165, 43.7844],
  WY: [-107.2903, 43.0760],
  DC: [-77.0369, 38.9072],
};

// Pastel colors for stickers
const stickerColors = [
  "#FFE4E1", // Misty Rose
  "#E0F0FF", // Light Blue
  "#E8F5E9", // Light Green
  "#FFF3E0", // Light Orange
  "#F3E5F5", // Light Purple
  "#E0F7FA", // Light Cyan
  "#FFF8E1", // Light Yellow
  "#FCE4EC", // Light Pink
];

export default function TravelMap({ states, onStateClick, messages }: TravelMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredSticker, setHoveredSticker] = useState<string | null>(null);

  const getStateData = (stateName: string): StateData | undefined => {
    const stateId = stateNameToId[stateName];
    return states.find((s) => s.id === stateId);
  };

  const getFillColor = (stateName: string): string => {
    const stateData = getStateData(stateName);
    if (!stateData) return "#f5f5f4"; // very light gray

    switch (stateData.status) {
      case "visited":
        return "#B8D4E8"; // soft dusty blue - warm toned
      case "wishlist":
        return "#FFE6CC"; // accent-200 from palette
      default:
        return "#f5f5f4"; // stone-100
    }
  };

  const getHoverColor = (stateName: string): string => {
    const stateData = getStateData(stateName);
    if (!stateData) return "#e7e5e4"; // stone-200

    switch (stateData.status) {
      case "visited":
        return "#9BC4DD"; // slightly darker dusty blue
      case "wishlist":
        return "#FFD699"; // accent-300 from palette
      default:
        return "#e7e5e4"; // stone-200
    }
  };

  const handleClick = (stateName: string) => {
    const stateId = stateNameToId[stateName];
    onStateClick(stateId, stateName);
  };

  // Get sticker color based on message index
  const getStickerColor = (index: number) => {
    return stickerColors[index % stickerColors.length];
  };

  // Group messages by state and only show most recent per state
  const messagesByState = messages.reduce((acc, msg) => {
    if (msg.stateId && !acc[msg.stateId]) {
      acc[msg.stateId] = msg;
    }
    return acc;
  }, {} as Record<string, MapMessage>);

  return (
    <div className="relative">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const isHovered = hoveredState === stateName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHovered ? getHoverColor(stateName) : getFillColor(stateName)}
                  stroke="#d4d4d4"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={() => setHoveredState(stateName)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleClick(stateName)}
                />
              );
            })
          }
        </Geographies>

        {/* Message Stickers */}
        {Object.entries(messagesByState).map(([stateId, msg], index) => {
          const coords = stateCoordinates[stateId];
          if (!coords) return null;

          return (
            <Marker key={msg.id} coordinates={coords}>
              <g
                onMouseEnter={() => setHoveredSticker(msg.id)}
                onMouseLeave={() => setHoveredSticker(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Sticker background */}
                <rect
                  x={-20}
                  y={-12}
                  width={40}
                  height={24}
                  rx={4}
                  fill={getStickerColor(index)}
                  stroke="#d4d4d4"
                  strokeWidth={0.5}
                  style={{
                    filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.1))",
                    transform: `rotate(${(index % 7) - 3}deg)`,
                  }}
                />
                {/* Small text indicator */}
                <text
                  textAnchor="middle"
                  y={4}
                  style={{
                    fontSize: "8px",
                    fill: "#666",
                    fontFamily: "system-ui",
                  }}
                >
                  {msg.name.slice(0, 6)}
                </text>
              </g>
            </Marker>
          );
        })}
      </ComposableMap>

      {/* State Tooltip */}
      {hoveredState && !hoveredSticker && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md text-sm">
          <span className="font-medium">{hoveredState}</span>
          <span className="ml-2 text-xs text-gray-500">Click to leave a message</span>
        </div>
      )}

      {/* Sticker Tooltip */}
      {hoveredSticker && (
        <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-lg shadow-md text-sm max-w-xs">
          {(() => {
            const msg = messages.find(m => m.id === hoveredSticker);
            if (!msg) return null;
            return (
              <>
                <div className="font-medium text-gray-900">{msg.name}</div>
                <p className="text-gray-600 text-xs mt-1">{msg.message}</p>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#B8D4E8" }} />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: "#FFE6CC" }} />
            <span>Wishlist</span>
          </div>
        </div>
      </div>
    </div>
  );
}
