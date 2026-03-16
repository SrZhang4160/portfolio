interface CodeComparisonProps {
  beforeTitle: string;
  beforeCode: string;
  afterTitle: string;
  afterCode: string;
}

export default function CodeComparison({
  beforeTitle,
  beforeCode,
  afterTitle,
  afterCode,
}: CodeComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {/* Before */}
      <div>
        <div className="text-sm font-semibold text-red-700 mb-2">
          <span className="text-red-500">× </span>{beforeTitle}
        </div>
        <pre className="bg-red-50 border border-red-200 text-gray-800 text-xs md:text-sm p-4 rounded-lg overflow-x-auto">
          <code>{beforeCode}</code>
        </pre>
      </div>

      {/* After */}
      <div>
        <div className="text-sm font-semibold text-green-700 mb-2">
          <span className="text-green-500">✓ </span>{afterTitle}
        </div>
        <pre className="bg-green-50 border border-green-200 text-gray-800 text-xs md:text-sm p-4 rounded-lg overflow-x-auto">
          <code>{afterCode}</code>
        </pre>
      </div>
    </div>
  );
}
