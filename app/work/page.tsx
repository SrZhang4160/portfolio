import { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/content";
import PortfolioCard from "@/components/PortfolioCard";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and projects from Sharon Zhang's work in healthcare AI and robotics.",
};

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">My Work</h1>
          <p className="text-xl text-gray-600">
            A collection of projects focused on healthcare AI, robotics, and
            medical device development. Each project represents a unique
            challenge and opportunity to improve patient outcomes.
          </p>
        </div>

        {/* Project Grid */}
        {caseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-semibold text-primary-900 mb-2">
              Case Studies Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              I&apos;m currently documenting my projects. Check back soon for
              detailed case studies of my work in healthcare AI and robotics.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Interested in working together?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-900 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
