"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  pendingComments: number;
  pendingThreads: number;
  pendingReplies: number;
  unreadContacts: number;
  pendingCoffeeChats: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.status === 401) {
          setIsAuthenticated(false);
        } else if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setStats(data);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your site content and submissions</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <StatCard
            title="Pending Comments"
            count={stats?.pendingComments || 0}
            href="/admin/comments"
            color="stone"
          />
          <StatCard
            title="Pending Threads"
            count={stats?.pendingThreads || 0}
            href="/admin/forum"
            color="neutral"
          />
          <StatCard
            title="Pending Replies"
            count={stats?.pendingReplies || 0}
            href="/admin/forum"
            color="zinc"
          />
          <StatCard
            title="Unread Contacts"
            count={stats?.unreadContacts || 0}
            href="/admin/contacts"
            color="green"
          />
          <StatCard
            title="Coffee Requests"
            count={stats?.pendingCoffeeChats || 0}
            href="/admin/coffee"
            color="amber"
          />
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLink
              href="/admin/comments"
              title="Moderate Comments"
              description="Review and approve user comments"
              icon="💬"
            />
            <QuickLink
              href="/admin/forum"
              title="Moderate Forum"
              description="Review forum threads and replies"
              icon="📋"
            />
            <QuickLink
              href="/admin/contacts"
              title="View Contacts"
              description="See contact form submissions"
              icon="📧"
            />
            <QuickLink
              href="/admin/coffee"
              title="Coffee Requests"
              description="Manage coffee chat bookings"
              icon="☕"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-primary-900 text-center mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-primary-900 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          <Link href="/" className="text-primary-600 hover:text-primary-800">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  count,
  href,
  color,
}: {
  title: string;
  count: number;
  href: string;
  color: "stone" | "neutral" | "zinc" | "green" | "amber";
}) {
  const colorClasses = {
    stone: "bg-stone-50 border-stone-200",
    neutral: "bg-neutral-50 border-neutral-200",
    zinc: "bg-zinc-50 border-zinc-200",
    green: "bg-green-50 border-green-200",
    amber: "bg-amber-50 border-amber-200",
  };

  const countColors = {
    stone: "text-stone-600",
    neutral: "text-neutral-600",
    zinc: "text-zinc-600",
    green: "text-green-600",
    amber: "text-amber-600",
  };

  return (
    <Link
      href={href}
      className={`block p-6 rounded-lg border-2 ${colorClasses[color]} hover:shadow-md transition-shadow`}
    >
      <div className={`text-3xl font-bold ${countColors[color]}`}>{count}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </Link>
  );
}

function QuickLink({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-medium text-primary-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  );
}
