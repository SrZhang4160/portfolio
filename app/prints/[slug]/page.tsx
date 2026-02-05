import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPrints, getPrintBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";
import CommentSection from "@/components/CommentSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const prints = await getAllPrints();
  return prints.map((print) => ({ slug: print.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const print = await getPrintBySlug(slug);

  if (!print) {
    return { title: "Not Found" };
  }

  return {
    title: print.title,
    description: print.description,
    openGraph: {
      title: print.title,
      description: print.description,
      images: print.images?.[0] ? [{ url: print.images[0] }] : undefined,
    },
  };
}

const categoryColors = {
  functional: "bg-stone-100 text-stone-700",
  art: "bg-amber-50 text-amber-800",
  material: "bg-neutral-100 text-neutral-700",
};

const categoryLabels = {
  functional: "Functional",
  art: "Art",
  material: "Material Test",
};

interface LeftColumnProps {
  title: string;
  description: string;
  category: "functional" | "art" | "material";
  featured?: boolean;
}

function LeftColumn({ title, description, category, featured }: LeftColumnProps) {
  return (
    <PageLeftColumn
      title={title}
      description={description}
      backLink={{ href: "/prints", label: "Back to Gallery" }}
    >
      <div className="flex flex-wrap gap-2">
        <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[category]}`}>
          {categoryLabels[category]}
        </span>
        {featured && (
          <span className="px-2 py-1 bg-accent-100 text-accent-800 rounded text-xs font-medium">
            Featured
          </span>
        )}
      </div>
    </PageLeftColumn>
  );
}

interface MiddleColumnProps {
  images?: string[];
  title: string;
  notes?: string;
  slug: string;
}

function MiddleColumn({ images, title, notes, slug }: MiddleColumnProps) {
  return (
    <div className="space-y-6">
      {/* Main Image - constrained size for better resolution */}
      {images && images.length > 0 && (
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Thumbnail Gallery */}
      {images && images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      {notes && (
        <div>
          <h2 className="font-semibold text-primary-900 mb-2 text-sm">Notes</h2>
          <p className="text-gray-600 text-sm">{notes}</p>
        </div>
      )}

      {/* Comments Section */}
      <CommentSection targetType="print" targetId={slug} />
    </div>
  );
}

interface RightColumnProps {
  material: string;
  printer: string;
  date: string;
  settings: {
    printTime: string;
    layerHeight: string;
    infill: string;
    supports: boolean;
  };
  stlLink?: string;
}

function RightColumn({ material, printer, date, settings, stlLink }: RightColumnProps) {
  return (
    <PageRightColumn>
      {/* Print Details */}
      <InfoCard
        title="Print Details"
        items={[
          { label: "Material", value: material },
          { label: "Printer", value: printer },
          { label: "Date Printed", value: formatDate(date) },
          { label: "Print Time", value: settings.printTime },
        ]}
      />

      {/* Print Settings */}
      <InfoCard title="Print Settings">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Layer Height</dt>
            <dd className="font-medium text-primary-900">{settings.layerHeight}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Infill</dt>
            <dd className="font-medium text-primary-900">{settings.infill}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Supports</dt>
            <dd className="font-medium text-primary-900">{settings.supports ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </InfoCard>

      {/* STL Download */}
      {stlLink && (
        <a
          href={stlLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-900 text-white font-medium text-sm rounded-lg hover:bg-primary-700 transition-colors"
        >
          Download STL
          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>
      )}

      {/* Related Prints */}
      <InfoCard title="Related Prints">
        <Link
          href="/prints"
          className="block text-sm text-primary-600 hover:text-primary-800"
        >
          View all prints →
        </Link>
      </InfoCard>
    </PageRightColumn>
  );
}

export default async function PrintPage({ params }: PageProps) {
  const { slug } = await params;
  const print = await getPrintBySlug(slug);

  if (!print) {
    notFound();
  }

  return (
    <ThreeColumnLayout
      leftColumn={
        <LeftColumn
          title={print.title}
          description={print.description}
          category={print.category}
          featured={print.featured}
        />
      }
      middleColumn={
        <MiddleColumn
          images={print.images}
          title={print.title}
          notes={print.notes}
          slug={slug}
        />
      }
      rightColumn={
        <RightColumn
          material={print.material}
          printer={print.printer}
          date={print.date}
          settings={print.settings}
          stlLink={print.stlLink}
        />
      }
    />
  );
}
