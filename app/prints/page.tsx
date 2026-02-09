import { Metadata } from "next";
import Link from "next/link";
import { getAllPrints } from "@/lib/content";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";
import PrintGallery from "@/components/PrintGallery";

export const metadata: Metadata = {
  title: "3D Prints",
  description:
    "Gallery of 3D prints by Sharon Zhang - functional prints, artistic creations, and material experiments.",
};

function LeftColumn() {
  return (
    <PageLeftColumn
      title="3D Prints"
      description="From functional items to artistic experiments."
      backLink={{ href: "/?section=beyond", label: "Back to Beyond" }}
      tags={["Functional", "Art"]}
    />
  );
}

interface MiddleColumnProps {
  prints: Awaited<ReturnType<typeof getAllPrints>>;
}

function MiddleColumn({ prints }: MiddleColumnProps) {
  if (prints.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🛠️</div>
        <h2 className="text-xl font-semibold text-primary-900 mb-2">
          Prints Coming Soon
        </h2>
        <p className="text-gray-600 text-sm">
          I&apos;m currently documenting my prints. Check back soon for a full
          gallery of my 3D printing projects!
        </p>
      </div>
    );
  }

  return <PrintGallery prints={prints} />;
}

function RightColumn() {
  return (
    <PageRightColumn>
      {/* Printer Info */}
      <InfoCard title="Current Setup">
        <div className="space-y-3">
          <div>
            <p className="font-medium text-primary-900 text-sm">Bambu Lab P1S</p>
            <p className="text-xs text-gray-600">with AMS</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Favorite materials</p>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">PLA</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">PETG</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">TPU</span>
            </div>
          </div>
        </div>
      </InfoCard>

      {/* Category Legend */}
      <InfoCard title="Categories">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-stone-200"></span>
            <span className="text-sm text-gray-700">Functional</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-100"></span>
            <span className="text-sm text-gray-700">Art</span>
          </div>
        </div>
      </InfoCard>

      {/* CTA */}
      <div className="bg-primary-50 rounded-lg p-5">
        <h3 className="font-semibold text-primary-900 text-sm mb-2">Have a print idea?</h3>
        <p className="text-xs text-gray-600 mb-3">
          I&apos;d love to hear your ideas or discuss 3D printing projects!
        </p>
        <Link
          href="/contact?subject=3D Printing"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-900 text-white font-medium text-sm rounded-lg hover:bg-primary-700 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </PageRightColumn>
  );
}

export default async function PrintsPage() {
  const prints = await getAllPrints();

  return (
    <ThreeColumnLayout
      leftColumn={<LeftColumn />}
      middleColumn={<MiddleColumn prints={prints} />}
      rightColumn={<RightColumn />}
    />
  );
}
