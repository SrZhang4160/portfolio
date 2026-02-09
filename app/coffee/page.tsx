import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Coffee Chat",
  description: "Book a virtual coffee chat with Sharon Zhang to discuss career, healthcare AI, robotics, or anything else.",
};

export default function CoffeeChatPage() {
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:overflow-hidden">
      <PageHeader />

      {/* Content - Responsive: Stack on mobile, 3-columns on desktop */}
      <div className="flex flex-col md:flex-row flex-1 w-full md:overflow-hidden">
        {/* Left side - Title & Info (Mobile: full width, Desktop: 25% sticky) */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="md:sticky md:top-0 md:h-screen md:max-h-screen px-4 md:px-6 py-6 md:overflow-hidden flex flex-col">
            <Link
              href="/?section=contact"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors text-sm mb-6"
            >
              ← Send a message
            </Link>

            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-semibold text-primary-900 tracking-tight leading-tight">
                Coffee Chat
              </h1>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              I love connecting with people! Book a 30-minute virtual coffee chat.
            </p>

            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-500 mb-3">What to expect</h3>
              <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                <li>30-minute virtual chat</li>
                <li>Casual conversation</li>
                <li>Google Meet or Zoom</li>
              </ul>
            </div>

            <div className="mb-4 hidden md:block">
              <h3 className="text-base font-medium text-gray-500 mb-3">Topics I love</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Healthcare AI</li>
                <li>Career advice</li>
                <li>3D Printing</li>
                <li>Sports & Balance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle - Calendar Embed (Mobile: full width, Desktop: 50%) */}
        <div className="w-full md:w-1/2 px-4 md:px-8 py-6 md:py-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col md:overflow-hidden">
          <h2 className="text-lg font-medium text-primary-900 mb-4 md:mb-6 shrink-0">Pick a time</h2>

          {/* Calendar Embed - Configure via NEXT_PUBLIC_CALENDAR_URL env variable */}
          <div className="flex-1 min-h-[400px] md:min-h-0">
            {process.env.NEXT_PUBLIC_CALENDAR_URL ? (
              <iframe
                src={process.env.NEXT_PUBLIC_CALENDAR_URL}
                width="100%"
                height="100%"
                frameBorder="0"
                className="rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                <div className="text-center p-6 md:p-8">
                  <p className="text-gray-500 mb-4">
                    Calendar booking is not yet configured.
                  </p>
                  <a
                    href="mailto:zsr_coco@outlook.com"
                    className="text-primary-600 hover:text-primary-800 underline"
                  >
                    Email me directly to schedule
                  </a>
                </div>
              </div>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500 shrink-0">
            Don&apos;t see a time that works?{" "}
            <a
              href="mailto:zsr_coco@outlook.com"
              className="text-gray-700 hover:text-gray-900 underline"
            >
              Email me
            </a>
          </p>
        </div>

        {/* Right side - Empty or decorative (Hidden on mobile, Desktop: 25%) */}
        <div className="hidden md:flex w-1/4 px-6 py-8">
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-300 text-sm">
              Looking forward to chatting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
