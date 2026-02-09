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
    />
  );
}

function MiddleColumn() {
  return (
    <div className="space-y-10">
      {/* Journey Section */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-4">My Journey</h2>
        <div className="prose prose-sm max-w-none w-full">
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
