import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPrints, getPrintBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
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
  functional: "bg-green-100 text-green-800",
  art: "bg-purple-100 text-purple-800",
  material: "bg-blue-100 text-blue-800",
};

const categoryLabels = {
  functional: "Functional",
  art: "Art",
  material: "Material Test",
};

export default async function PrintPage({ params }: PageProps) {
  const { slug } = await params;
  const print = await getPrintBySlug(slug);

  if (!print) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Back Link */}
        <Link
          href="/prints"
          className="text-primary-600 hover:text-primary-800 mb-8 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            {print.images && print.images.length > 0 && (
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={print.images[0]}
                  alt={print.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Additional Images */}
            {print.images && print.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {print.images.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${print.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    categoryColors[print.category]
                  }`}
                >
                  {categoryLabels[print.category]}
                </span>
                {print.featured && (
                  <span className="px-2 py-1 bg-accent-100 text-accent-800 rounded text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                {print.title}
              </h1>
              <p className="text-gray-600">{print.description}</p>
            </div>

            {/* Print Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="font-semibold text-primary-900 mb-4">
                Print Details
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Material</dt>
                  <dd className="font-medium text-primary-900">
                    {print.material}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Printer</dt>
                  <dd className="font-medium text-primary-900">
                    {print.printer}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Date Printed</dt>
                  <dd className="font-medium text-primary-900">
                    {formatDate(print.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Print Time</dt>
                  <dd className="font-medium text-primary-900">
                    {print.settings.printTime}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Print Settings */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h2 className="font-semibold text-primary-900 mb-4">
                Print Settings
              </h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Layer Height</dt>
                  <dd className="font-medium text-primary-900">
                    {print.settings.layerHeight}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Infill</dt>
                  <dd className="font-medium text-primary-900">
                    {print.settings.infill}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Supports</dt>
                  <dd className="font-medium text-primary-900">
                    {print.settings.supports ? "Yes" : "No"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Notes */}
            {print.notes && (
              <div className="mb-6">
                <h2 className="font-semibold text-primary-900 mb-2">Notes</h2>
                <p className="text-gray-600">{print.notes}</p>
              </div>
            )}

            {/* STL Link */}
            {print.stlLink && (
              <a
                href={print.stlLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-900 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Download STL
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <CommentSection targetType="print" targetId={slug} />
        </div>
      </div>
    </div>
  );
}
