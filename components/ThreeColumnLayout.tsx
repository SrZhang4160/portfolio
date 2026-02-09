import PageHeader from "./PageHeader";

interface ThreeColumnLayoutProps {
  leftColumn: React.ReactNode;
  middleColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

export default function ThreeColumnLayout({
  leftColumn,
  middleColumn,
  rightColumn,
}: ThreeColumnLayoutProps) {
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden">
      <PageHeader />

      {/* Content Grid - Responsive: Stack on mobile, 3-columns on desktop */}
      <div className="flex flex-col md:flex-row flex-1 w-full md:overflow-hidden">
        {/* Column 1 - Left (Mobile: full width, Desktop: 25%) */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 px-4 md:px-6 py-6 md:py-8 md:overflow-hidden">
          {leftColumn}
        </div>

        {/* Column 2 - Middle (Mobile: full width, Desktop: 50%) */}
        <div className="w-full md:w-1/2 px-4 md:px-6 py-6 md:py-8 border-b md:border-b-0 md:border-r border-gray-200 md:overflow-y-auto">
          {middleColumn}
        </div>

        {/* Column 3 - Right (Mobile: full width, Desktop: 25%) */}
        <div className="w-full md:w-1/4 px-4 md:px-6 py-6 md:py-8 md:overflow-y-auto">
          {rightColumn}
        </div>
      </div>
    </div>
  );
}
