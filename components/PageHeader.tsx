"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "info", label: "Info", href: "/?section=info" },
  { id: "work", label: "Work", href: "/?section=work" },
  { id: "beyond", label: "Beyond", href: "/?section=beyond" },
  { id: "contact", label: "Contact", href: "/?section=contact" },
];

function CurrentTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-sm text-gray-600">{time}</span>;
}

interface PageHeaderProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function PageHeader({ activeSection, onSectionChange }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="flex w-full">
        {/* Column 1 Header - Name (25%) */}
        <div className="w-1/4 px-6 py-4">
          <Link href="/" className="text-lg font-semibold text-primary-900">
            Sharon Zhang
          </Link>
        </div>

        {/* Column 2 Header - Navigation (50%) */}
        <div className="w-1/2 px-6 py-4">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              onSectionChange ? (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`text-sm transition-colors ${
                    activeSection === item.id
                      ? "font-semibold text-primary-900"
                      : "text-gray-500 hover:text-primary-900"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm text-gray-500 hover:text-primary-900 transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Column 3 Header - Time and Let's Talk (25%) */}
        <div className="w-1/4 px-6 py-4 flex items-center justify-between">
          <CurrentTime />
          <Link
            href="/coffee"
            className="text-sm font-medium text-primary-900 hover:text-gray-600 transition-colors"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </header>
  );
}
