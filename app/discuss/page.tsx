import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Discuss",
  description: "Join discussions about AI in healthcare, 3D printing, and work-life balance.",
};

const topics = [
  {
    slug: "ai-healthcare",
    title: "AI in Healthcare",
    description:
      "Discuss the intersection of artificial intelligence and medical technology. Share insights, ask questions, and explore the future of healthcare AI.",
    icon: "🏥",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
  },
  {
    slug: "3d-printing",
    title: "3D Printing",
    description:
      "Share tips, projects, and questions about 3D printing. From print settings to material recommendations, let's learn together.",
    icon: "🖨️",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
  {
    slug: "life-balance",
    title: "Life Balance",
    description:
      "Conversations about balancing career, hobbies, and personal growth. How do you maintain wellness while pursuing ambitious goals?",
    icon: "⚖️",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
  },
];

export default function DiscussPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Discussion Forums
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to the community! Choose a topic to join the conversation.
            Share your experiences, ask questions, and connect with others who
            share your interests.
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/discuss/${topic.slug}`}
              className={`block rounded-lg border-2 p-6 transition-colors ${topic.color}`}
            >
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">
                {topic.title}
              </h2>
              <p className="text-gray-600 text-sm">{topic.description}</p>
              <span className="inline-block mt-4 text-primary-600 font-medium text-sm">
                Join discussion →
              </span>
            </Link>
          ))}
        </div>

        {/* Guidelines */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-primary-900 mb-4">
              Community Guidelines
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Be respectful</strong> - We&apos;re all here to learn and
                  share. Treat others as you&apos;d like to be treated.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Stay on topic</strong> - Keep discussions relevant to
                  the forum category.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Share knowledge</strong> - Your experience, however
                  big or small, can help someone else.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>
                  <strong>Ask questions</strong> - There are no dumb questions.
                  We all started somewhere.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              All posts are moderated to ensure a positive community experience.
              Posts typically appear within 24 hours of submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
