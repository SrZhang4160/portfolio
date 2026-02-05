"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  transparent?: boolean;
}

const navigation = [
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Prints", href: "/prints" },
  { name: "Travel", href: "/travel" },
  { name: "Basketball", href: "/basketball" },
  { name: "Discuss", href: "/discuss" },
  { name: "Contact", href: "/contact" },
];

export default function Header({ transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        transparent ? "bg-transparent" : "bg-white shadow-sm"
      )}
    >
      <nav className="container-wide flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span
            className={cn(
              "text-xl font-bold",
              transparent ? "text-white" : "text-primary-900"
            )}
          >
            Sharon Zhang
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                transparent ? "text-white hover:text-primary-200" : "text-gray-700"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={cn(
              "h-6 w-6",
              transparent ? "text-white" : "text-gray-700"
            )}
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
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container-wide py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
