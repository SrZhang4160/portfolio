"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

interface Comment {
  id: string;
  targetType: string;
  targetId: string;
  content: string;
  authorName: string;
  authorEmail: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?status=${filter}`);
      if (response.status === 401) {
        window.location.href = "/admin";
        return;
      }
      const data = await response.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setComments((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
      }
    } catch (error) {
      console.error("Error updating comment:", error);
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
            Moderate Comments
          </h1>
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

        {/* Comments List */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No {filter} comments found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-primary-900">
                        {comment.authorName}
                      </span>
                      {comment.authorEmail && (
                        <span className="text-sm text-gray-500">
                          ({comment.authorEmail})
                        </span>
                      )}
                      <StatusBadge status={comment.status} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      On {comment.targetType}/{comment.targetId} •{" "}
                      {formatRelativeTime(comment.createdAt)}
                    </div>
                  </div>
                  {comment.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(comment.id, "approved")}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(comment.id, "rejected")}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {comment.content}
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
