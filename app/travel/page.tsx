"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import StateModal from "@/components/StateModal";
import { StateData } from "@/lib/content";

// Dynamically import TravelMap to avoid SSR issues with react-simple-maps
const TravelMap = dynamic(() => import("@/components/TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
});

export default function TravelPage() {
  const [states, setStates] = useState<StateData[]>([]);
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load states data
    fetch("/api/travel-states")
      .then((res) => res.json())
      .then((data) => {
        if (data.states) {
          setStates(data.states);
        }
      })
      .catch(console.error);
  }, []);

  const handleStateClick = (state: StateData | null) => {
    if (state) {
      setSelectedState(state);
      setIsModalOpen(true);
    }
  };

  const visitedCount = states.filter((s) => s.status === "visited").length;
  const wishlistCount = states.filter((s) => s.status === "wishlist").length;

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Travel Map
          </h1>
          <p className="text-xl text-gray-600">
            Exploring the United States one state at a time. Click on any state
            to see my experiences or share your recommendations for places I
            haven&apos;t visited yet!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-primary-600">
              {visitedCount}
            </div>
            <div className="text-sm text-gray-600">States Visited</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-accent-500">
              {wishlistCount}
            </div>
            <div className="text-sm text-gray-600">On Wishlist</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-gray-400">
              {50 - visitedCount}
            </div>
            <div className="text-sm text-gray-600">To Explore</div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-12">
          <TravelMap states={states} onStateClick={handleStateClick} />
        </div>

        {/* Visited States List */}
        {visitedCount > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary-900 mb-6">
              Places I&apos;ve Been
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {states
                .filter((s) => s.status === "visited")
                .map((state) => (
                  <button
                    key={state.id}
                    onClick={() => handleStateClick(state)}
                    className="text-left bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-primary-900">
                        {state.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {state.visitDate}
                      </span>
                    </div>
                    {state.highlights && state.highlights.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {state.highlights.slice(0, 3).join(", ")}
                        {state.highlights.length > 3 &&
                          ` +${state.highlights.length - 3} more`}
                      </p>
                    )}
                  </button>
                ))}
            </div>
          </section>
        )}

        {/* Wishlist States */}
        {wishlistCount > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-primary-900 mb-6">
              On My Bucket List
            </h2>
            <p className="text-gray-600 mb-6">
              These are states I&apos;m hoping to visit soon. If you have
              recommendations, I&apos;d love to hear them!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {states
                .filter((s) => s.status === "wishlist")
                .map((state) => (
                  <button
                    key={state.id}
                    onClick={() => handleStateClick(state)}
                    className="text-left bg-accent-50 rounded-lg p-4 hover:bg-accent-100 transition-colors"
                  >
                    <h3 className="font-semibold text-primary-900">
                      {state.name}
                    </h3>
                    {state.notes && (
                      <p className="text-sm text-gray-600 mt-1">{state.notes}</p>
                    )}
                    {state.recommendationRequest && (
                      <p className="text-sm text-accent-600 mt-2 font-medium">
                        Looking for tips!
                      </p>
                    )}
                  </button>
                ))}
            </div>
          </section>
        )}
      </div>

      {/* State Modal */}
      <StateModal
        state={selectedState}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
