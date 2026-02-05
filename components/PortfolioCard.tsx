import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

export default function PortfolioCard({
  title,
  slug,
  description,
  thumbnail,
  tags,
  featured = false,
}: PortfolioCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className={cn(
        "group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1",
        featured && "ring-2 ring-accent-400"
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
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
        {featured && (
          <div className="absolute top-3 right-3 bg-accent-400 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
