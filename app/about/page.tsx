import { Metadata } from "next";
import Link from "next/link";
import BookWidget from "@/components/BookWidget";
import { getBookData } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Sharon Zhang's journey from mechanical engineering to robotics and healthcare AI.",
};

export default async function AboutPage() {
  const bookData = await getBookData();

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl font-bold text-primary-900 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            I&apos;m a robotics engineer passionate about using technology to
            improve healthcare outcomes. My journey has taken me from
            mechanical engineering fundamentals to cutting-edge AI applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Journey Section */}
            <section>
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                My Journey
              </h2>
              <div className="prose max-w-none">
                <p>
                  My path into robotics began with a mechanical engineering
                  degree, where I fell in love with the intersection of
                  hardware and software. The ability to create physical
                  systems that could sense, think, and act fascinated me.
                </p>
                <p>
                  After graduating, I dove into medical robotics, working on
                  brachytherapy automation systems. This experience showed me
                  the incredible potential of robotics to improve patient
                  outcomes and reduce the burden on healthcare providers.
                </p>
                <p>
                  Today at Carina AI, I&apos;m building the next generation of
                  healthcare AI tools. We&apos;re tackling some of the most
                  challenging problems in medical imaging and treatment
                  planning, using machine learning to augment clinical
                  decision-making.
                </p>
              </div>
            </section>

            {/* Values Section */}
            <section>
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                What Drives Me
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-3">🎯</div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    Impact-Driven
                  </h3>
                  <p className="text-gray-600 text-sm">
                    I measure success by real-world outcomes. Every project I
                    take on needs to meaningfully improve someone&apos;s life.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-3">🔬</div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    Rigorous Yet Practical
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Good engineering means balancing theoretical correctness
                    with real-world constraints and timelines.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-3">🤝</div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    Collaborative
                  </h3>
                  <p className="text-gray-600 text-sm">
                    The best solutions come from diverse perspectives. I love
                    working with clinicians, designers, and engineers.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl mb-3">📚</div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    Always Learning
                  </h3>
                  <p className="text-gray-600 text-sm">
                    The field moves fast. I dedicate time every week to
                    learning new techniques and staying current.
                  </p>
                </div>
              </div>
            </section>

            {/* Community Section */}
            <section>
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">
                Community Involvement
              </h2>
              <div className="bg-accent-100 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏀</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">
                      She Got Buckets
                    </h3>
                    <p className="text-gray-700 mb-4">
                      I co-founded She Got Buckets, a community initiative to
                      empower women in basketball. We organize pickup games,
                      skill sessions, and create a supportive space for women
                      to enjoy the sport.
                    </p>
                    <Link
                      href="/basketball"
                      className="text-primary-600 font-medium hover:text-primary-800"
                    >
                      Learn more about She Got Buckets →
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Image Placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg
                    className="w-20 h-20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary-900">Sharon Zhang</h3>
                <p className="text-sm text-gray-600">
                  Robotics Engineer @ Carina AI
                </p>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-primary-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/work"
                    className="text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <span className="mr-2">📁</span> View my portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/coffee"
                    className="text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <span className="mr-2">☕</span> Schedule a chat
                  </Link>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <span className="mr-2">💼</span> Connect on LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <span className="mr-2">💻</span> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
