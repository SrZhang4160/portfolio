import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import CommentSection from "@/components/CommentSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return { title: "Not Found" };
  }

  return {
    title: caseStudy.frontmatter.title,
    description: caseStudy.frontmatter.description,
    openGraph: {
      title: caseStudy.frontmatter.title,
      description: caseStudy.frontmatter.description,
      images: caseStudy.frontmatter.hero
        ? [{ url: caseStudy.frontmatter.hero }]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { frontmatter, content } = caseStudy;

  return (
    <article className="py-12 md:py-20">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-16 mb-12">
        <div className="container-wide">
          <Link
            href="/work"
            className="text-primary-200 hover:text-white mb-6 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Work
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-xl text-primary-100 mb-6 max-w-3xl">
            {frontmatter.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              {/* Project Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-primary-900 mb-4">
                  Project Details
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500">Role</dt>
                    <dd className="font-medium text-primary-900">
                      {frontmatter.role}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Timeline</dt>
                    <dd className="font-medium text-primary-900">
                      {frontmatter.timeline}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Team</dt>
                    <dd className="font-medium text-primary-900">
                      {frontmatter.team}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Date</dt>
                    <dd className="font-medium text-primary-900">
                      {formatDate(frontmatter.date)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Tools */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-primary-900 mb-4">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact */}
              {frontmatter.impact && frontmatter.impact.length > 0 && (
                <div className="bg-accent-100 rounded-lg p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">
                    Impact
                  </h3>
                  <div className="space-y-4">
                    {frontmatter.impact.map((item, index) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-accent-600">
                          {item.metric}
                        </div>
                        <div className="text-sm text-gray-700">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            {/* Hero Image */}
            {frontmatter.hero && (
              <div className="relative h-64 md:h-96 mb-12 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={frontmatter.hero}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* MDX Content */}
            <div className="prose max-w-none">
              <MDXRemote source={content} />
            </div>

            {/* Discussion Prompt */}
            <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                What do you think?
              </h3>
              <p className="text-gray-600 mb-4">
                Have questions about this project or want to share your
                thoughts? Leave a comment below or join the discussion in the
                forums.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/discuss/ai-healthcare"
                  className="text-primary-600 font-medium hover:text-primary-800"
                >
                  Join the AI Healthcare discussion →
                </Link>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <CommentSection targetType="work" targetId={slug} />
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}
