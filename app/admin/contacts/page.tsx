"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { formatRelativeTime } from "@/lib/utils";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  createdAt: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "archived">("unread");
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/contacts?status=${filter}`);
      if (response.status === 401) {
        window.location.href = "/admin";
        return;
      }
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateStatus = async (id: string, status: "read" | "archived") => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const viewContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    if (contact.status === "unread") {
      updateStatus(contact.id, "read");
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
            Contact Submissions
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["unread", "read", "archived", "all"] as const).map((status) => (
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
            ) : contacts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No {filter} contacts found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => viewContact(contact)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedContact?.id === contact.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    } ${contact.status === "unread" ? "font-medium" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-primary-900">{contact.name}</span>
                      <StatusBadge status={contact.status} />
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {contact.subject}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatRelativeTime(contact.createdAt)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail View */}
          <div>
            {selectedContact ? (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-primary-900">
                      {selectedContact.subject}
                    </h2>
                    <div className="text-sm text-gray-500 mt-1">
                      From {selectedContact.name} ({selectedContact.email})
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatRelativeTime(selectedContact.createdAt)}
                    </div>
                  </div>
                  <StatusBadge status={selectedContact.status} />
                </div>
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-700"
                  >
                    Reply via Email
                  </a>
                  {selectedContact.status !== "archived" && (
                    <button
                      onClick={() => updateStatus(selectedContact.id, "archived")}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Archive
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  Select a contact to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "unread" | "read" | "archived" }) {
  const classes = {
    unread: "bg-blue-100 text-blue-800",
    read: "bg-gray-100 text-gray-800",
    archived: "bg-gray-100 text-gray-500",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${classes[status]}`}>
      {status}
    </span>
  );
}
