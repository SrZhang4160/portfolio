import Image from "next/image";

interface BookWidgetProps {
  title: string;
  author: string;
  cover: string;
  progress: number;
  notes?: string;
}

export default function BookWidget({
  title,
  author,
  cover,
  progress,
  notes,
}: BookWidgetProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Currently Reading
      </h3>
      <div className="flex gap-4">
        {/* Book Cover */}
        <div className="relative w-20 h-28 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-primary-900 truncate">{title}</h4>
          <p className="text-sm text-gray-600 mb-2">{author}</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{progress}% complete</p>

          {notes && (
            <p className="text-sm text-gray-600 mt-2 italic line-clamp-2">
              &ldquo;{notes}&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
