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

      {/* Content - Three Columns */}
      <div className="flex flex-1 w-full">
        {/* Left side - Title & Info (25%) - Sticky */}
        <div className="w-1/4 border-r border-gray-200">
          <div className="sticky top-0 h-screen max-h-screen px-6 py-8 overflow-hidden flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold text-primary-900 tracking-tight leading-tight">
                Let&apos;s talk
              </h1>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              Have a question or want to collaborate? Drop me a message.
            </p>

            <div className="mt-auto">
              <Link
                href="/coffee"
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
              >
                Or schedule a coffee chat →
              </Link>
            </div>
          </div>
        </div>

        {/* Middle - Form (50%) */}
        <div className="w-1/2 px-8 pt-8 border-r border-gray-200">
          <ContactForm />
        </div>

        {/* Right side - Contact links at bottom left (25%) */}
        <div className="w-1/4 px-6 py-8 flex flex-col">
          <div className="mt-auto flex flex-col gap-2">
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
