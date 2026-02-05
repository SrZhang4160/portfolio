"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  stateId: string | null;
  color: string;
  status: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<GuestMessage | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/messages");
      if (response.status === 401) {
        window.location.href = "/admin";
        return;
      }
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
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
            Guest Messages
          </h1>
        </div>

        {/* Stats */}
        <div className="mb-6 text-sm text-gray-600">
          {messages.length} total message{messages.length !== 1 ? "s" : ""}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div>
            {isLoading ? (
              <div className="text-center py-12 text-gray-500">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No guest messages yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedMessage?.id === msg.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: msg.color }}
                        />
                        <span className="text-primary-900 font-medium">{msg.name}</span>
                      </div>
                      {msg.stateId && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {msg.stateId}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {msg.message}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatRelativeTime(msg.createdAt)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail View */}
          <div>
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: selectedMessage.color }}
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-primary-900">
                        {selectedMessage.name}
                      </h2>
                      {selectedMessage.stateId && (
                        <span className="text-sm text-gray-500">
                          From {selectedMessage.stateId}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatRelativeTime(selectedMessage.createdAt)}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  {deleteConfirm === selectedMessage.id ? (
                    <>
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(selectedMessage.id)}
                      className="px-4 py-2 text-red-600 hover:text-red-800 border border-red-200 rounded-lg hover:border-red-300"
                    >
                      Delete Message
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
