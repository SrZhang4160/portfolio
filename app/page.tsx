import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";
import PortfolioCard from "@/components/PortfolioCard";

export default async function Home() {
  const caseStudies = await getAllCaseStudies();
  const featuredProjects = caseStudies.filter((cs) => cs.frontmatter.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Hi, I&apos;m Sharon Zhang
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              MechE turned Robotics Engineer, building at the intersection of
              <span className="text-accent-400"> AI and healthcare</span>.
              Currently at Carina AI, previously worked on brachytherapy automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
              >
                View My Work
              </Link>
              <Link
                href="/coffee"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Let&apos;s Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-2">
                Featured Work
              </h2>
              <p className="text-gray-600">
                Healthcare AI projects that made an impact
              </p>
            </div>
            <Link
              href="/work"
              className="text-primary-600 font-medium hover:text-primary-800 hidden sm:block"
            >
              View all projects →
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <PortfolioCard
                  key={project.slug}
                  title={project.frontmatter.title}
                  slug={project.slug}
                  description={project.frontmatter.description}
                  thumbnail={project.frontmatter.thumbnail}
                  tags={project.frontmatter.tags}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder cards when no content */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="h-40 bg-gray-100 rounded-md mb-4" />
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          <Link
            href="/work"
            className="text-primary-600 font-medium hover:text-primary-800 mt-8 block sm:hidden"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* Interests Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-primary-900 mb-12 text-center">
            Beyond Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3D Printing */}
            <Link
              href="/prints"
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🖨️</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                3D Printing
              </h3>
              <p className="text-gray-600">
                Functional prints, artistic experiments, and material explorations
              </p>
            </Link>

            {/* Travel */}
            <Link
              href="/travel"
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                Travel Map
              </h3>
              <p className="text-gray-600">
                Exploring the US one state at a time - share your recommendations!
              </p>
            </Link>

            {/* Basketball */}
            <Link
              href="/basketball"
              className="group bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🏀</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                She Got Buckets
              </h3>
              <p className="text-gray-600">
                Community basketball and empowering women in sports
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent-400 text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Interested in healthcare AI, robotics, or just want to chat about
            3D printing and basketball?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-accent-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/discuss"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Join the Discussion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
