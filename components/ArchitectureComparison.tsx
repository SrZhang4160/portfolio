interface FlowItem {
  label: string;
  badge?: string;
}

interface ArchitectureComparisonProps {
  beforeTitle: string;
  beforeFlow: FlowItem[];
  beforeCons: string[];
  afterTitle: string;
  afterFlow: FlowItem[];
  afterPros: string[];
}

export default function ArchitectureComparison({
  beforeTitle,
  beforeFlow,
  beforeCons,
  afterTitle,
  afterFlow,
  afterPros,
}: ArchitectureComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {/* Before Column */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-red-900 mb-4">{beforeTitle}</h3>

        {/* Flow */}
        <div className="space-y-2 mb-6">
          {beforeFlow.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {idx > 0 && <div className="text-red-400 text-sm">↓</div>}
              <div className="flex-1 bg-white border border-red-200 rounded px-3 py-2 text-sm">
                <span className="text-gray-700">{item.label}</span>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cons */}
        <div className="space-y-1.5 text-sm">
          {beforeCons.map((con, idx) => (
            <div key={idx} className="flex items-start gap-2 text-red-800">
              <span className="text-red-500 font-bold">×</span>
              <span>{con}</span>
            </div>
          ))}
        </div>
      </div>

      {/* After Column */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-green-900 mb-4">{afterTitle}</h3>

        {/* Flow */}
        <div className="space-y-2 mb-6">
          {afterFlow.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {idx > 0 && <div className="text-green-400 text-sm">↓</div>}
              <div className="flex-1 bg-white border border-green-200 rounded px-3 py-2 text-sm">
                <span className="text-gray-700">{item.label}</span>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pros */}
        <div className="space-y-1.5 text-sm">
          {afterPros.map((pro, idx) => (
            <div key={idx} className="flex items-start gap-2 text-green-800">
              <span className="text-green-500 font-bold">✓</span>
              <span>{pro}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
