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
    <div className="min-h-screen flex flex-col">
      <PageHeader />

      {/* Content Grid - Three Columns */}
      <div className="flex flex-1 w-full">
        {/* Column 1 - Left (25%) - Sticky */}
        <div className="w-1/4 border-r border-gray-200">
          <div className="sticky top-0 h-screen max-h-screen px-6 py-8 overflow-hidden">
            {leftColumn}
          </div>
        </div>

        {/* Column 2 - Middle (50%) */}
        <div className="w-1/2 px-6 py-8 border-r border-gray-200">
          {middleColumn}
        </div>

        {/* Column 3 - Right (25%) */}
        <div className="w-1/4 px-6 py-8">
          {rightColumn}
        </div>
      </div>
    </div>
  );
}
