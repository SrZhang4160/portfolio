import { Metadata } from "next";
import Link from "next/link";
import { getAllPrints } from "@/lib/content";
import PrintGallery from "@/components/PrintGallery";

export const metadata: Metadata = {
  title: "3D Prints",
  description:
    "Gallery of 3D prints by Sharon Zhang - functional prints, artistic creations, and material experiments.",
};

export default async function PrintsPage() {
  const prints = await getAllPrints();

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            3D Prints Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to my 3D printing corner! From functional household items
            to artistic experiments, here&apos;s a collection of things I&apos;ve
            designed and printed. Click on any print to see more details about
            the settings and process.
          </p>
        </div>

        {/* Printer Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="text-4xl">🖨️</div>
            <div>
              <h2 className="font-semibold text-primary-900 mb-1">
                Current Setup
              </h2>
              <p className="text-gray-600">
                <strong>Printer:</strong> Bambu Lab X1 Carbon with AMS
              </p>
              <p className="text-gray-600">
                <strong>Favorite materials:</strong> PLA, PETG, TPU
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {prints.length > 0 ? (
          <PrintGallery prints={prints} />
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛠️</div>
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">
              Prints Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              I&apos;m currently documenting my prints. Check back soon for a
              full gallery of my 3D printing projects!
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-primary-900 mb-4">
            Have a print idea?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I&apos;m always looking for interesting projects. If you have an idea
            for a print or want to discuss 3D printing, join the conversation!
          </p>
          <Link
            href="/discuss/3d-printing"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-900 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Join the 3D Printing Discussion
          </Link>
        </div>
      </div>
    </div>
  );
}
