"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";
import { StateData } from "@/lib/content";

const TravelMap = dynamic(() => import("@/components/TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading map...</div>
    </div>
  ),
});

interface MapMessage {
  id: string;
  name: string;
  message: string;
  stateId: string;
  createdAt: string;
}

function LeftColumn() {
  return (
    <PageLeftColumn
      title="Travel Map"
      description="Exploring the US one state at a time."
      backLink={{ href: "/?section=beyond", label: "Back to Beyond" }}
      tags={["Adventure", "Exploration"]}
    />
  );
}

interface MiddleColumnProps {
  states: StateData[];
  messages: MapMessage[];
  onStateClick: (stateId: string, stateName: string) => void;
}

function MiddleColumn({ states, messages, onStateClick }: MiddleColumnProps) {
  return (
    <div className="space-y-8">
      {/* Map */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        <TravelMap states={states} onStateClick={onStateClick} messages={messages} />
      </div>

      {/* Instruction */}
      <div className="text-center text-gray-500 text-sm">
        Click any state to leave a message. Hover over stickers to see what others have shared!
      </div>
    </div>
  );
}

interface RightColumnProps {
  visitedCount: number;
  wishlistCount: number;
  recentMessages: MapMessage[];
}

function RightColumn({ visitedCount, wishlistCount, recentMessages }: RightColumnProps) {
  return (
    <PageRightColumn>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#5A9BC4" }}>{visitedCount}</div>
          <div className="text-xs text-gray-600">States Visited</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-accent-500">{wishlistCount}</div>
          <div className="text-xs text-gray-600">On Wishlist</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-gray-400">{50 - visitedCount}</div>
          <div className="text-xs text-gray-600">To Explore</div>
        </div>
      </div>

      {/* Recent Messages */}
      {recentMessages.length > 0 && (
        <InfoCard title="Recent Messages">
          <div className="space-y-3">
            {recentMessages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="text-sm">
                <div className="font-medium text-gray-900">{msg.name}</div>
                <p className="text-xs text-gray-600 line-clamp-2">{msg.message}</p>
              </div>
            ))}
          </div>
        </InfoCard>
      )}

      {/* Legend */}
      <InfoCard title="Legend">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: "#B8D4E8" }}></span>
            <span className="text-sm text-gray-700">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: "#FFE6CC" }}></span>
            <span className="text-sm text-gray-700">Wishlist</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: "#f5f5f4" }}></span>
            <span className="text-sm text-gray-700">Not visited</span>
          </div>
        </div>
      </InfoCard>
    </PageRightColumn>
  );
}

// Message Modal Component
function MessageModal({
  isOpen,
  onClose,
  stateName,
  stateId,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  stateName: string;
  stateId: string;
  onSubmit: (name: string, message: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(name, message);
      setName("");
      setMessage("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit message");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Leave a Message</h2>
            <p className="text-sm text-gray-600">{stateName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={140}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none resize-none"
              placeholder="Share a recommendation, memory, or greeting..."
            />
            <div className="text-xs text-gray-400 text-right mt-1">
              {message.length}/140
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !name || !message}
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Posting..." : "Post Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function TravelPage() {
  const [states, setStates] = useState<StateData[]>([]);
  const [messages, setMessages] = useState<MapMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<{ id: string; name: string } | null>(null);

  // Fetch states
  useEffect(() => {
    fetch("/api/travel-states")
      .then((res) => res.json())
      .then((data) => {
        if (data.states) {
          setStates(data.states);
        }
      })
      .catch(console.error);
  }, []);

  // Fetch messages and poll for updates
  const fetchMessages = useCallback(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setMessages(data.data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchMessages();
    // Poll every 10 seconds for new messages
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleStateClick = (stateId: string, stateName: string) => {
    setSelectedState({ id: stateId, name: stateName });
    setIsModalOpen(true);
  };

  const handleSubmitMessage = async (name: string, message: string) => {
    if (!selectedState) return;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        message,
        stateId: selectedState.id,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to post message");
    }

    // Refresh messages immediately
    fetchMessages();
  };

  const visitedCount = states.filter((s) => s.status === "visited").length;
  const wishlistCount = states.filter((s) => s.status === "wishlist").length;

  return (
    <>
      <ThreeColumnLayout
        leftColumn={<LeftColumn />}
        middleColumn={
          <MiddleColumn
            states={states}
            messages={messages}
            onStateClick={handleStateClick}
          />
        }
        rightColumn={
          <RightColumn
            visitedCount={visitedCount}
            wishlistCount={wishlistCount}
            recentMessages={messages}
          />
        }
      />
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stateName={selectedState?.name || ""}
        stateId={selectedState?.id || ""}
        onSubmit={handleSubmitMessage}
      />
    </>
  );
}
