"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatRelativeTime, formatDate } from "@/lib/utils";

interface CoffeeChatRequest {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string | null;
  preferredTime: string | null;
  status: "pending" | "confirmed" | "declined" | "completed";
  createdAt: string;
}

export default function AdminCoffeePage() {
  const [requests, setRequests] = useState<CoffeeChatRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "declined" | "completed">("pending");
  const [selectedRequest, setSelectedRequest] = useState<CoffeeChatRequest | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/coffee?status=${filter}`);
      if (response.status === 401) {
        window.location.href = "/admin";
        return;
      }
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const updateStatus = async (id: string, status: "confirmed" | "declined" | "completed") => {
    try {
      const response = await fetch(`/api/admin/coffee/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
        if (selectedRequest?.id === id) {
          setSelectedRequest({ ...selectedRequest, status });
        }
      }
    } catch (error) {
      console.error("Error updating request:", error);
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
            Coffee Chat Requests
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["pending", "confirmed", "declined", "completed", "all"] as const).map((status) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div>
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No {filter} requests found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {requests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedRequest?.id === request.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-primary-900">
                        {request.name}
                      </span>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="text-sm text-gray-600">
                      Topic: {request.topic}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatRelativeTime(request.createdAt)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail View */}
          <div>
            {selectedRequest ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-primary-900">
                      {selectedRequest.name}
                    </h2>
                    <div className="text-sm text-gray-500 mt-1">
                      {selectedRequest.email}
                    </div>
                  </div>
                  <StatusBadge status={selectedRequest.status} />
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Topic</div>
                    <div className="font-medium text-primary-900">
                      {selectedRequest.topic}
                    </div>
                  </div>
                  {selectedRequest.preferredTime && (
                    <div>
                      <div className="text-sm text-gray-500">Preferred Time</div>
                      <div className="font-medium text-primary-900">
                        {selectedRequest.preferredTime}
                      </div>
                    </div>
                  )}
                  {selectedRequest.message && (
                    <div>
                      <div className="text-sm text-gray-500">Message</div>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedRequest.message}
                      </p>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-500">Submitted</div>
                    <div className="text-gray-700">
                      {formatDate(selectedRequest.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${selectedRequest.email}?subject=Coffee Chat Request`}
                      className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-700"
                    >
                      Send Email
                    </a>
                    {selectedRequest.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(selectedRequest.id, "confirmed")}
                          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(selectedRequest.id, "declined")}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {selectedRequest.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(selectedRequest.id, "completed")}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  Select a request to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "confirmed" | "declined" | "completed" }) {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${classes[status]}`}>
      {status}
    </span>
  );
}
