"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Discuss", href: "/discuss" },
];

const secondaryNav = [
  { name: "3D Prints", href: "/prints" },
  { name: "Travel", href: "/travel" },
  { name: "Basketball", href: "/basketball" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="container-wide flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg font-semibold text-primary-900">
            Sharon Zhang
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/coffee"
            className="text-sm font-medium px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container-wide py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-base font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2 pt-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">More</p>
              {secondaryNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm text-gray-500 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4">
              <Link
                href="/coffee"
                className="block w-full text-center py-3 bg-primary-900 text-white font-medium rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
