"use client";

import { useState, useEffect } from "react";

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  color: string;
  createdAt: string;
}

// Muted, calm color palette matching the website's refined aesthetic
const mutedColors = [
  "#F5F5F0", // warm off-white
  "#E8E8E3", // light warm gray
  "#F0EDE8", // cream
  "#E5E5E0", // soft gray
  "#EDE8E3", // warm beige
];

// Generate a consistent random rotation for each message based on its id
function getRotation(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return ((hash % 5) - 2); // -2 to +2 degrees (subtle rotation)
}

// Pick a consistent color based on message id
function getColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return mutedColors[Math.abs(hash) % mutedColors.length];
}

function StickyNote({ message }: { message: GuestMessage }) {
  const rotation = getRotation(message.id);
  const color = getColor(message.id);

  return (
    <div
      className="p-3 rounded-md border border-gray-200/50 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <p className="text-sm text-gray-700 mb-2 break-words leading-relaxed">&ldquo;{message.message}&rdquo;</p>
      <p className="text-xs text-gray-500 font-medium">- {message.name}</p>
    </div>
  );
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !message.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setName("");
        setMessage("");
        // Add new message to the top of the list
        setMessages((prev) => [data.data, ...prev.slice(0, 14)]);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || "Failed to post message");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-medium text-primary-900">
          Leave a Note
        </h3>
        <p className="text-xs text-gray-500 mt-1">Say hi or share a thought</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors"
        />
        <textarea
          placeholder="Your message (140 chars max)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={140}
          rows={2}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1.5 bg-primary-900 text-white text-sm font-medium rounded-md hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {/* Status messages */}
      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-100 rounded-md text-red-600 text-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 p-2 bg-green-50 border border-green-100 rounded-md text-green-600 text-xs">
          Your note has been posted!
        </div>
      )}

      {/* Messages grid */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            Be the first to leave a note!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {messages.slice(0, 15).map((msg) => (
              <StickyNote key={msg.id} message={msg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
