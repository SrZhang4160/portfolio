"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

interface ForumThread {
  id: string;
  topic: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface ForumReply {
  id: string;
  threadId: string;
  content: string;
  authorName: string;
  authorEmail: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  thread?: {
    title: string;
    topic: string;
  };
}

type Tab = "threads" | "replies";

export default function AdminForumPage() {
  const [tab, setTab] = useState<Tab>("threads");
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = tab === "threads"
        ? `/api/admin/forum/threads?status=${filter}`
        : `/api/admin/forum/replies?status=${filter}`;

      const response = await fetch(endpoint);
      if (response.status === 401) {
        window.location.href = "/admin";
        return;
      }
      const data = await response.json();
      if (data.success) {
        if (tab === "threads") {
          setThreads(data.data);
        } else {
          setReplies(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [tab, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateThreadStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/admin/forum/threads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setThreads((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
      }
    } catch (error) {
      console.error("Error updating thread:", error);
    }
  };

  const updateReplyStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/admin/forum/replies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setReplies((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="text-primary-600 hover:text-primary-800"
          >
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-primary-900">
            Moderate Forum
          </h1>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setTab("threads")}
            className={`pb-2 px-1 font-medium ${
              tab === "threads"
                ? "text-primary-900 border-b-2 border-primary-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Threads
          </button>
          <button
            onClick={() => setTab("replies")}
            className={`pb-2 px-1 font-medium ${
              tab === "replies"
                ? "text-primary-900 border-b-2 border-primary-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Replies
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["pending", "approved", "rejected", "all"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === status
                  ? "bg-primary-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : tab === "threads" ? (
          threads.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No {filter} threads found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {thread.topic}
                        </span>
                        <StatusBadge status={thread.status} />
                      </div>
                      <h3 className="font-semibold text-primary-900">
                        {thread.title}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        By {thread.authorName}
                        {thread.authorEmail && ` (${thread.authorEmail})`} •{" "}
                        {formatRelativeTime(thread.createdAt)}
                      </div>
                    </div>
                    {thread.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateThreadStatus(thread.id, "approved")}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateThreadStatus(thread.id, "rejected")}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap line-clamp-3">
                    {thread.content}
                  </p>
                </div>
              ))}
            </div>
          )
        ) : replies.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No {filter} replies found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {replies.map((reply) => (
              <div
                key={reply.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <StatusBadge status={reply.status} />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Reply to: <span className="font-medium">{reply.thread?.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      By {reply.authorName}
                      {reply.authorEmail && ` (${reply.authorEmail})`} •{" "}
                      {formatRelativeTime(reply.createdAt)}
                    </div>
                  </div>
                  {reply.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateReplyStatus(reply.id, "approved")}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateReplyStatus(reply.id, "rejected")}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${classes[status]}`}>
      {status}
    </span>
  );
}
