interface PhaseItem {
  title: string;
  tag: string;
  body: string;
  bullets: string[];
}

interface PhaseTimelineProps {
  phases: PhaseItem[];
}

export default function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="space-y-8 my-8">
      {phases.map((phase, idx) => (
        <div key={idx} className="flex gap-4">
          {/* Timeline marker */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-primary-600 border-2 border-white shadow-sm" />
            {idx < phases.length - 1 && (
              <div className="w-0.5 flex-1 bg-gray-300 mt-2" style={{ minHeight: '80px' }} />
            )}
          </div>

          {/* Content card */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-lg font-semibold text-primary-900">{phase.title}</h3>
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-medium">
                {phase.tag}
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{phase.body}</p>
            <ul className="space-y-2">
              {phase.bullets.map((bullet, bulletIdx) => (
                <li key={bulletIdx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary-500 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
