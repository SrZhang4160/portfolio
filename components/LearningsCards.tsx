interface LearningsCardsProps {
  workedWell: string[];
  doNext: string[];
}

export default function LearningsCards({
  workedWell,
  doNext,
}: LearningsCardsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {/* What worked well */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          What worked well
        </h3>
        <div className="space-y-3">
          {workedWell.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What I'd do differently */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          What I&apos;d do differently
        </h3>
        <div className="space-y-3">
          {doNext.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-accent-600 font-bold mt-0.5">→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
