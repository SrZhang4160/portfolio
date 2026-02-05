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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Desktop Header */}
      <div className="hidden md:flex w-full">
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

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-semibold text-primary-900">
            Sharon Zhang
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/coffee"
              className="text-sm font-medium text-primary-900"
            >
              Let&apos;s talk
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <nav className="border-t border-gray-200 bg-white">
            {navItems.map((item) => (
              onSectionChange ? (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm transition-colors border-b border-gray-100 ${
                    activeSection === item.id
                      ? "font-semibold text-primary-900 bg-gray-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors border-b border-gray-100"
                >
                  {item.label}
                </Link>
              )
            ))}
            <div className="px-4 py-3 text-sm text-gray-500">
              <CurrentTime />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
