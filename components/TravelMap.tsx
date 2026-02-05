"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { StateData } from "@/lib/content";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface TravelMapProps {
  states: StateData[];
  onStateClick: (state: StateData | null) => void;
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

export default function TravelMap({ states, onStateClick }: TravelMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getStateData = (stateName: string): StateData | undefined => {
    const stateId = stateNameToId[stateName];
    return states.find((s) => s.id === stateId);
  };

  const getFillColor = (stateName: string): string => {
    const stateData = getStateData(stateName);
    if (!stateData) return "#e2e8f0"; // gray-300

    switch (stateData.status) {
      case "visited":
        return "#3182ce"; // primary-500
      case "wishlist":
        return "#ed8936"; // accent-400
      default:
        return "#e2e8f0"; // gray-300
    }
  };

  const getHoverColor = (stateName: string): string => {
    const stateData = getStateData(stateName);
    if (!stateData) return "#cbd5e0"; // gray-400

    switch (stateData.status) {
      case "visited":
        return "#2c5282"; // primary-700
      case "wishlist":
        return "#c05621"; // accent-600
      default:
        return "#cbd5e0"; // gray-400
    }
  };

  const handleClick = (stateName: string) => {
    const stateData = getStateData(stateName);
    onStateClick(stateData || null);
  };

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
                  stroke="#ffffff"
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
      </ComposableMap>

      {/* Tooltip */}
      {hoveredState && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md text-sm">
          <span className="font-medium">{hoveredState}</span>
          {getStateData(hoveredState) && (
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs ${
                getStateData(hoveredState)?.status === "visited"
                  ? "bg-primary-100 text-primary-800"
                  : getStateData(hoveredState)?.status === "wishlist"
                  ? "bg-accent-100 text-accent-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {getStateData(hoveredState)?.status === "visited"
                ? "Visited"
                : getStateData(hoveredState)?.status === "wishlist"
                ? "On my list"
                : "Not yet"}
            </span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white px-4 py-3 rounded-lg shadow-md">
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary-500" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-accent-400" />
            <span>Wishlist</span>
          </div>
        </div>
      </div>
    </div>
  );
}
