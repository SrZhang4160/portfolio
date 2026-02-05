"use client";

import { useState } from "react";
import PrintCard from "./PrintCard";
import { Print } from "@/lib/content";
import { cn } from "@/lib/utils";

interface PrintGalleryProps {
  prints: Print[];
}

type FilterCategory = "all" | "functional" | "art" | "material";

const filters: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "functional", label: "Functional" },
  { value: "art", label: "Art" },
  { value: "material", label: "Material Tests" },
];

export default function PrintGallery({ prints }: PrintGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredPrints =
    activeFilter === "all"
      ? prints
      : prints.filter((print) => print.category === activeFilter);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeFilter === filter.value
                ? "bg-primary-900 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            {filter.label}
            <span className="ml-2 text-xs opacity-70">
              (
              {filter.value === "all"
                ? prints.length
                : prints.filter((p) => p.category === filter.value).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredPrints.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrints.map((print) => (
            <PrintCard key={print.slug} print={print} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No prints found in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
