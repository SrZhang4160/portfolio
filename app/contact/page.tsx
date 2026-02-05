import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Sharon Zhang for collaborations, questions, or just to say hello.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />

      {/* Content - Responsive: Stack on mobile, 3-columns on desktop */}
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Left side - Title & Info (Mobile: full width, Desktop: 25% sticky) */}
        <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="md:sticky md:top-0 md:h-screen md:max-h-screen px-4 md:px-6 py-6 md:py-8 md:overflow-hidden flex flex-col">
            <div className="mb-4 md:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-900 tracking-tight leading-tight">
                Let&apos;s talk
              </h1>
            </div>

            <p className="text-gray-600 leading-relaxed mb-4 md:mb-8">
              Have a question or want to collaborate? Drop me a message.
            </p>

            <div className="md:mt-auto">
              <Link
                href="/coffee"
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
              >
                Or schedule a coffee chat →
              </Link>
            </div>
          </div>
        </div>

        {/* Middle - Form (Mobile: full width, Desktop: 50%) */}
        <div className="w-full md:w-1/2 px-4 md:px-8 py-6 md:pt-8 border-b md:border-b-0 md:border-r border-gray-200">
          <ContactForm />
        </div>

        {/* Right side - Contact links (Mobile: full width, Desktop: 25%) */}
        <div className="w-full md:w-1/4 px-4 md:px-6 py-6 md:py-8 flex flex-col">
          <div className="md:mt-auto flex flex-row md:flex-col gap-4 md:gap-2 flex-wrap">
            <a
              href="mailto:zsr_coco@outlook.com"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              zsr_coco@outlook.com
            </a>
            <a
              href="https://www.linkedin.com/in/shuranzhang/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SrZhang4160"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
