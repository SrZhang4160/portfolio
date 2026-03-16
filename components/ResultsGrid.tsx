interface ResultItem {
  icon: string;
  title: string;
  description: string;
}

interface ResultsGridProps {
  results: ResultItem[];
}

export default function ResultsGrid({ results }: ResultsGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {results.map((result, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-base font-semibold text-primary-900 mb-2">
            {result.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {result.description}
          </p>
        </div>
      ))}
    </div>
  );
}
