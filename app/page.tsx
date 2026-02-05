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
    <div className="h-screen flex flex-col overflow-hidden">
      <PageHeader activeSection={currentSection} onSectionChange={handleSectionChange} />

      {/* Content Grid - Three Columns */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Column 1 - Profile (25%) */}
        <div className="w-1/4 border-r border-gray-200 px-6 py-6 overflow-hidden">
          <ProfileColumn activeSection={currentSection} />
        </div>

        {/* Column 2 - Main Content (50%) */}
        <div className="w-1/2 px-6 py-6 border-r border-gray-200 overflow-y-auto">
          <MiddleColumn activeSection={currentSection} />
        </div>

        {/* Column 3 - Content (25%) */}
        <div className="w-1/4 px-6 py-6 overflow-y-auto">
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
