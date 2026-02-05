import { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";
import PortfolioCard from "@/components/PortfolioCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and projects from Sharon Zhang's work in healthcare AI and robotics.",
};

function LeftColumn() {
  return (
    <PageLeftColumn
      title="My Work"
      description="A collection of projects focused on healthcare AI, robotics, and medical device development. Each project represents a unique challenge and opportunity to improve patient outcomes."
      tags={["Healthcare AI", "Medical Imaging", "ML/AI", "Automation"]}
    />
  );
}

interface MiddleColumnProps {
  caseStudies: Awaited<ReturnType<typeof getAllCaseStudies>>;
}

function MiddleColumn({ caseStudies }: MiddleColumnProps) {
  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold text-primary-900 mb-2">
          Case Studies Coming Soon
        </h2>
        <p className="text-gray-600 text-sm">
          I&apos;m currently documenting my projects. Check back soon for detailed
          case studies of my work in healthcare AI and robotics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {caseStudies.map((project) => (
        <PortfolioCard
          key={project.slug}
          title={project.frontmatter.title}
          slug={project.slug}
          description={project.frontmatter.description}
          thumbnail={project.frontmatter.thumbnail}
          tags={project.frontmatter.tags}
          featured={project.frontmatter.featured}
        />
      ))}
    </div>
  );
}

function RightColumn() {
  return (
    <PageRightColumn>
      {/* Featured Project Highlight */}
      <InfoCard title="Featured" variant="highlight">
        <div className="text-sm text-gray-700">
          <p className="font-medium text-primary-900 mb-1">AutoBrachy</p>
          <p className="text-xs text-gray-600">
            Automated brachytherapy planning using AI for cancer treatment.
          </p>
        </div>
      </InfoCard>

      {/* Categories */}
      <InfoCard title="Categories">
        <div className="space-y-2">
          <button className="block text-sm text-gray-600 hover:text-primary-900 transition-colors">
            All Projects
          </button>
          <button className="block text-sm text-gray-600 hover:text-primary-900 transition-colors">
            Healthcare AI
          </button>
          <button className="block text-sm text-gray-600 hover:text-primary-900 transition-colors">
            Medical Imaging
          </button>
          <button className="block text-sm text-gray-600 hover:text-primary-900 transition-colors">
            Robotics
          </button>
        </div>
      </InfoCard>

      {/* CTA */}
      <div className="mt-auto">
        <p className="text-sm text-gray-600 mb-3">Interested in working together?</p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-primary-900 text-white font-medium text-sm rounded-lg hover:bg-primary-700 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </PageRightColumn>
  );
}

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <ThreeColumnLayout
      leftColumn={<LeftColumn />}
      middleColumn={<MiddleColumn caseStudies={caseStudies} />}
      rightColumn={<RightColumn />}
    />
  );
}
