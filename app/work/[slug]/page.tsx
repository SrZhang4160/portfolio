import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";
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

interface LeftColumnProps {
  title: string;
  description: string;
  tags: string[];
}

function LeftColumn({ title, description, tags }: LeftColumnProps) {
  return (
    <PageLeftColumn
      title={title}
      description={description}
      backLink={{ href: "/work", label: "Back to Work" }}
      tags={tags}
    />
  );
}

interface MiddleColumnProps {
  hero?: string;
  title: string;
  content: string;
  slug: string;
}

function MiddleColumn({ hero, title, content, slug }: MiddleColumnProps) {
  return (
    <div className="space-y-8">
      {/* Hero Image */}
      {hero && (
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={hero}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* MDX Content */}
      <div className="prose prose-sm max-w-none">
        <MDXRemote source={content} />
      </div>

      {/* Discussion Prompt */}
      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-base font-semibold text-primary-900 mb-2">
          What do you think?
        </h3>
        <p className="text-gray-600 text-sm">
          Have questions about this project or want to share your thoughts?
          Leave a comment below!
        </p>
      </div>

      {/* Comments Section */}
      <CommentSection targetType="work" targetId={slug} />
    </div>
  );
}

interface RightColumnProps {
  role: string;
  timeline: string;
  team: string;
  date: string;
  tools: string[];
  impact?: Array<{ metric: string; label: string }>;
}

function RightColumn({ role, timeline, team, date, tools, impact }: RightColumnProps) {
  return (
    <PageRightColumn>
      {/* Project Details */}
      <InfoCard
        title="Project Details"
        items={[
          { label: "Role", value: role },
          { label: "Timeline", value: timeline },
          { label: "Team", value: team },
          { label: "Date", value: formatDate(date) },
        ]}
      />

      {/* Tools & Technologies */}
      <InfoCard title="Tools & Technologies">
        <div className="flex flex-wrap gap-1">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs rounded"
            >
              {tool}
            </span>
          ))}
        </div>
      </InfoCard>

      {/* Impact */}
      {impact && impact.length > 0 && (
        <InfoCard title="Impact" variant="highlight">
          <div className="space-y-3">
            {impact.map((item, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-accent-600">
                  {item.metric}
                </div>
                <div className="text-xs text-gray-700">{item.label}</div>
              </div>
            ))}
          </div>
        </InfoCard>
      )}

      {/* Related Projects */}
      <InfoCard title="Related Projects">
        <div className="space-y-2">
          <Link
            href="/work"
            className="block text-sm text-primary-600 hover:text-primary-800"
          >
            View all projects →
          </Link>
        </div>
      </InfoCard>
    </PageRightColumn>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { frontmatter, content } = caseStudy;

  return (
    <ThreeColumnLayout
      leftColumn={
        <LeftColumn
          title={frontmatter.title}
          description={frontmatter.description}
          tags={frontmatter.tags}
        />
      }
      middleColumn={
        <MiddleColumn
          hero={frontmatter.hero}
          title={frontmatter.title}
          content={content}
          slug={slug}
        />
      }
      rightColumn={
        <RightColumn
          role={frontmatter.role}
          timeline={frontmatter.timeline}
          team={frontmatter.team}
          date={frontmatter.date}
          tools={frontmatter.tools}
          impact={frontmatter.impact}
        />
      }
    />
  );
}
