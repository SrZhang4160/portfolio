import { Metadata } from "next";
import CoffeeChatForm from "@/components/CoffeeChatForm";

export const metadata: Metadata = {
  title: "Coffee Chat",
  description: "Book a virtual coffee chat with Sharon Zhang to discuss career, healthcare AI, robotics, or anything else.",
};

export default function CoffeeChatPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">☕</div>
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              Let&apos;s Have a Coffee Chat
            </h1>
            <p className="text-xl text-gray-600">
              I love connecting with people! Whether you want career advice,
              want to discuss healthcare AI, or just have an interesting idea
              to share, I&apos;m happy to chat.
            </p>
          </div>

          {/* What to expect */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="font-semibold text-primary-900 mb-4">
              What to Expect
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-accent-500 mr-3">✓</span>
                <span>
                  <strong>30-minute virtual chat</strong> - Usually via Google
                  Meet or Zoom
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-500 mr-3">✓</span>
                <span>
                  <strong>Casual conversation</strong> - No agenda required,
                  come with questions or just to chat
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-500 mr-3">✓</span>
                <span>
                  <strong>Response within 48 hours</strong> - I&apos;ll get back
                  to you with available times
                </span>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div className="mb-12">
            <h2 className="font-semibold text-primary-900 mb-4 text-center">
              Topics I Love Discussing
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🤖</div>
                <span className="text-sm text-gray-700">Healthcare AI</span>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🎯</div>
                <span className="text-sm text-gray-700">Career Advice</span>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🖨️</div>
                <span className="text-sm text-gray-700">3D Printing</span>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl mb-2">🏀</div>
                <span className="text-sm text-gray-700">Sports & Balance</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-primary-900 mb-6">
              Request a Chat
            </h2>
            <CoffeeChatForm />
          </div>

          {/* Calendly Alternative */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Prefer to book directly? You can also schedule via{" "}
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 underline"
              >
                Calendly
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
