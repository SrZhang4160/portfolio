"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";
import ForumNewThread from "@/components/ForumNewThread";
import ForumThread from "@/components/ForumThread";

interface Thread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  _count?: {
    replies: number;
  };
  replies?: Array<{
    id: string;
    content: string;
    authorName: string;
    parentId: string | null;
    createdAt: string;
  }>;
}

const topicInfo: Record<
  string,
  { title: string; description: string; icon: string }
> = {
  "ai-healthcare": {
    title: "AI in Healthcare",
    description:
      "Discuss the intersection of artificial intelligence and medical technology.",
    icon: "🏥",
  },
  "3d-printing": {
    title: "3D Printing",
    description: "Share tips, projects, and questions about 3D printing.",
    icon: "🖨️",
  },
  "sports": {
    title: "Sports",
    description:
      "Conversations about basketball, fitness, and women in sports.",
    icon: "🏀",
  },
};

interface PageProps {
  params: Promise<{ topic: string }>;
}

export default function TopicPage({ params }: PageProps) {
  const { topic } = use(params);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const info = topicInfo[topic];

  const fetchThreads = useCallback(async () => {
    try {
      const response = await fetch(`/api/forum?topic=${topic}`);
      const data = await response.json();
      if (data.success) {
        setThreads(data.data);
      }
    } catch (error) {
      console.error("Error fetching threads:", error);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const fetchThread = async (threadId: string) => {
    try {
      const response = await fetch(`/api/forum/${threadId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedThread(data.data);
      }
    } catch (error) {
      console.error("Error fetching thread:", error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  if (!info) {
    return (
      <div className="py-12 md:py-20">
        <div className="container-wide text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">
            Topic Not Found
          </h1>
          <Link href="/discuss" className="text-primary-600 hover:text-primary-800">
            ← Back to forums
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Back Link */}
        <Link
          href="/discuss"
          className="text-primary-600 hover:text-primary-800 mb-8 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
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
          Back to Forums
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{info.icon}</span>
            <h1 className="text-3xl font-bold text-primary-900">{info.title}</h1>
          </div>
          <p className="text-gray-600">{info.description}</p>
        </div>

        {selectedThread ? (
          /* Thread Detail View */
          <div>
            <button
              onClick={() => setSelectedThread(null)}
              className="text-primary-600 hover:text-primary-800 mb-6 inline-flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
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
              Back to thread list
            </button>
            <ForumThread thread={{
              ...selectedThread,
              replies: selectedThread.replies || []
            }} />
          </div>
        ) : (
          /* Thread List View */
          <div className="space-y-6">
            {/* New Thread Button */}
            <ForumNewThread topic={topic} onSuccess={fetchThreads} />

            {/* Thread List */}
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">
                Loading discussions...
              </div>
            ) : threads.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-primary-900 mb-2">
                  No discussions yet
                </h3>
                <p className="text-gray-600">
                  Be the first to start a conversation!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {threads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => fetchThread(thread.id)}
                    className="w-full text-left bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">
                      {thread.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {thread.content}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="font-medium text-primary-700">
                          {thread.authorName}
                        </span>
                        <span>•</span>
                        <span>{formatRelativeTime(thread.createdAt)}</span>
                      </div>
                      <span className="text-gray-500">
                        {thread._count?.replies || 0} replies
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
