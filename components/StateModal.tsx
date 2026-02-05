"use client";

import { StateData } from "@/lib/content";

interface StateModalProps {
  state: StateData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StateModal({ state, isOpen, onClose }: StateModalProps) {
  if (!isOpen || !state) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-primary-900">{state.name}</h2>
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                state.status === "visited"
                  ? "bg-primary-100 text-primary-800"
                  : state.status === "wishlist"
                  ? "bg-accent-100 text-accent-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {state.status === "visited"
                ? "Visited"
                : state.status === "wishlist"
                ? "On my wishlist"
                : "Haven't been yet"}
            </span>
          </div>
          {state.visitDate && (
            <p className="text-gray-500 mt-1">Visited: {state.visitDate}</p>
          )}
        </div>

        {/* Highlights */}
        {state.highlights && state.highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {state.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {state.notes && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Notes</h3>
            <p className="text-gray-600">{state.notes}</p>
          </div>
        )}

        {/* Recommendation Request */}
        {state.status === "wishlist" && state.recommendationRequest && (
          <div className="bg-accent-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-accent-800 mb-2">
              I&apos;d love your recommendations!
            </h3>
            <p className="text-accent-700 text-sm mb-4">
              {state.recommendationRequest}
            </p>
            <a
              href={`/contact?subject=Travel recommendations for ${state.name}`}
              className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-800"
            >
              Share your tips →
            </a>
          </div>
        )}

        {/* Call to action for not visited */}
        {state.status === "none" && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm">
              I haven&apos;t visited {state.name} yet. If you have recommendations,
              I&apos;d love to hear them!
            </p>
            <a
              href={`/contact?subject=Travel recommendations for ${state.name}`}
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 mt-2"
            >
              Share your tips →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
