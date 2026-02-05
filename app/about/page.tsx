import { Metadata } from "next";
import Link from "next/link";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";
import BookWidget from "@/components/BookWidget";
import { getBookData } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sharon Zhang's journey from mechanical engineering to robotics and healthcare AI.",
};

function LeftColumn() {
  return (
    <PageLeftColumn
      title="About Me"
      description="Robotics engineer passionate about using technology to improve healthcare outcomes."
      tags={["MechE", "Robotics", "Johns Hopkins", "Carina AI"]}
    >
      {/* Social Links */}
      <div className="flex flex-col gap-3 mt-4">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </PageLeftColumn>
  );
}

function MiddleColumn() {
  return (
    <div className="space-y-10">
      {/* Journey Section */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-4">My Journey</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 leading-relaxed">
            My path into robotics began with a mechanical engineering degree,
            where I fell in love with the intersection of hardware and software.
            The ability to create physical systems that could sense, think, and
            act fascinated me.
          </p>
          <p className="text-gray-600 leading-relaxed">
            After graduating, I dove into medical robotics, working on
            brachytherapy automation systems. This experience showed me the
            incredible potential of robotics to improve patient outcomes and
            reduce the burden on healthcare providers.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today at Carina AI, I&apos;m building the next generation of healthcare
            AI tools. We&apos;re tackling some of the most challenging problems in
            medical imaging and treatment planning, using machine learning to
            augment clinical decision-making.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-4">What Drives Me</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1 text-sm">Impact-Driven</h3>
            <p className="text-gray-600 text-xs">
              Measuring success by real-world outcomes
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1 text-sm">Rigorous Yet Practical</h3>
            <p className="text-gray-600 text-xs">
              Balancing theory with real-world constraints
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1 text-sm">Collaborative</h3>
            <p className="text-gray-600 text-xs">
              Best solutions from diverse perspectives
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1 text-sm">Always Learning</h3>
            <p className="text-gray-600 text-xs">
              Staying current with new techniques
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-4">Community</h2>
        <div className="bg-accent-100 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🏀</div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-1 text-sm">She Got Buckets</h3>
              <p className="text-gray-700 text-sm mb-3">
                I co-founded She Got Buckets, a community initiative to empower
                women in basketball.
              </p>
              <Link
                href="/basketball"
                className="text-primary-600 font-medium hover:text-primary-800 text-sm"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function RightColumn() {
  const bookData = await getBookData();

  return (
    <PageRightColumn>
      {/* Profile Image */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="aspect-square bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-primary-900 text-sm">Sharon Zhang</h3>
          <p className="text-xs text-gray-600">Robotics Engineer @ Carina AI</p>
        </div>
      </div>

      {/* Currently Reading */}
      {bookData.currentlyReading && (
        <BookWidget
          title={bookData.currentlyReading.title}
          author={bookData.currentlyReading.author}
          cover={bookData.currentlyReading.cover}
          progress={bookData.currentlyReading.progress}
          notes={bookData.currentlyReading.notes}
        />
      )}

      {/* Quick Links */}
      <InfoCard title="Quick Links">
        <ul className="space-y-2">
          <li>
            <Link
              href="/work"
              className="text-primary-600 hover:text-primary-800 flex items-center text-sm"
            >
              <span className="mr-2">📁</span> View my portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/coffee"
              className="text-primary-600 hover:text-primary-800 flex items-center text-sm"
            >
              <span className="mr-2">☕</span> Schedule a chat
            </Link>
          </li>
        </ul>
      </InfoCard>
    </PageRightColumn>
  );
}

export default async function AboutPage() {
  return (
    <ThreeColumnLayout
      leftColumn={<LeftColumn />}
      middleColumn={<MiddleColumn />}
      rightColumn={await RightColumn()}
    />
  );
}
