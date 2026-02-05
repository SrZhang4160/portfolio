"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProfileColumn from "@/components/ProfileColumn";
import MiddleColumn from "@/components/MiddleColumn";
import ContentColumn from "@/components/ContentColumn";
import PageHeader from "@/components/PageHeader";

function HomeContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const [activeSection, setActiveSection] = useState("home");

  // Use URL param if present, otherwise use state
  const currentSection = sectionParam || activeSection;

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Update URL without full page reload
    window.history.pushState({}, "", section === "home" ? "/" : `/?section=${section}`);
  };

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden">
      <PageHeader activeSection={currentSection} onSectionChange={handleSectionChange} />

      {/* Content Grid - Responsive: Stack on mobile, 3-columns on desktop */}
      <div className="flex flex-col md:flex-row flex-1 w-full md:overflow-hidden">
        {/* Column 1 - Profile (Mobile: full width, Desktop: 25%) */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 px-4 md:px-6 py-6 md:overflow-hidden">
          <ProfileColumn activeSection={currentSection} />
        </div>

        {/* Column 2 - Main Content (Mobile: full width, Desktop: 50%) */}
        <div className="w-full md:w-1/2 px-4 md:px-6 py-6 border-b md:border-b-0 md:border-r border-gray-200 md:overflow-y-auto">
          <MiddleColumn activeSection={currentSection} />
        </div>

        {/* Column 3 - Content (Mobile: full width, Desktop: 25%) */}
        <div className="w-full md:w-1/4 px-4 md:px-6 py-6 md:overflow-y-auto">
          <ContentColumn activeSection={currentSection} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
