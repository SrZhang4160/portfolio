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
      backLink={{ href: "/?section=work", label: "Back to Work" }}
      tags={tags}
    />
  );
}

interface MiddleColumnProps {
  hero?: string;
  title: string;
  content: string;
}

function MiddleColumn({ hero, title, content }: MiddleColumnProps) {
  return (
    <div className="space-y-8">
      {/* Hero Image */}
      {hero && (
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={hero}
            alt={title}
            width={1899}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>
      )}

      {/* MDX Content */}
      <div className="text-gray-600 space-y-4 w-full [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-primary-900 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-primary-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-primary-900 [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1">
        <MDXRemote source={content} />
      </div>
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
