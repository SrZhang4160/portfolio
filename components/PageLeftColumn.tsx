import Link from "next/link";

interface PageLeftColumnProps {
  title: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
  tags?: string[];
  bottomContent?: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageLeftColumn({
  title,
  description,
  backLink,
  tags,
  bottomContent,
  children,
}: PageLeftColumnProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Back Link */}
      {backLink && (
        <Link
          href={backLink.href}
          className="text-primary-600 hover:text-primary-800 mb-4 inline-flex items-center text-sm"
        >
          <svg
            className="w-4 h-4 mr-1"
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
          {backLink.label}
        </Link>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-primary-900 tracking-tight leading-tight mb-4">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* Custom children content */}
      {children && <div className="mb-6">{children}</div>}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-col mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-lg font-medium text-primary-900 tracking-tight py-2 border-b border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Content */}
      {bottomContent && <div className="mt-auto">{bottomContent}</div>}
    </div>
  );
}
