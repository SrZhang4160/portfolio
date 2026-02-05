import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Print } from "@/lib/content";

interface PrintCardProps {
  print: Print;
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

export default function PrintCard({ print }: PrintCardProps) {
  return (
    <Link
      href={`/prints/${print.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {print.images && print.images.length > 0 ? (
          <Image
            src={print.images[0]}
            alt={print.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              categoryColors[print.category]
            )}
          >
            {categoryLabels[print.category]}
          </span>
        </div>

        {/* Featured Badge */}
        {print.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-accent-400 text-white rounded text-xs font-medium">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-primary-600 transition-colors">
          {print.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {print.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{print.material}</span>
          <span>•</span>
          <span>{print.settings.printTime}</span>
        </div>
      </div>
    </Link>
  );
}
