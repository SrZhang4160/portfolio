import Link from "next/link";
import Image from "next/image";
import { getAllCaseStudies } from "@/lib/content";
import PortfolioCard from "@/components/PortfolioCard";

export default async function Home() {
  const caseStudies = await getAllCaseStudies();
  const featuredProjects = caseStudies.filter((cs) => cs.frontmatter.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section - Clean & Focused */}
      <section className="py-10 md:py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                <Image
                  src="/images/portrait.jpg"
                  alt="Sharon Zhang"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-primary-500 font-medium mb-3 tracking-wide uppercase text-sm">
                Healthcare Engineer
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
                Sharon Zhang
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Building life-saving AI for cancer care. Robotics engineer turning complex medical challenges into elegant solutions.
              </p>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500">
                  <span>Carina Medical</span>
                  <span className="hidden sm:inline">·</span>
                  <span>Johns Hopkins</span>
                  <span className="hidden sm:inline">·</span>
                  <span>She Got Buckets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-10 md:py-14">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                Featured Work
              </h2>
              <p className="text-gray-600 text-lg">
                Healthcare AI projects with real-world impact
              </p>
            </div>
            <Link
              href="/work"
              className="text-primary-500 font-medium hover:text-primary-600 hidden sm:flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover-lift">
                  <div className="h-40 bg-gray-100 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          <Link
            href="/work"
            className="text-primary-500 font-medium hover:text-primary-600 mt-8 flex items-center gap-1 sm:hidden justify-center"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Beyond Work */}
      <section className="py-10 md:py-14 border-t border-gray-200">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                Beyond Work
              </h2>
              <p className="text-gray-600 text-lg">
                Hobbies and side projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 3D Printing Card */}
            <Link
              href="/prints"
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                <span className="text-5xl font-bold text-gray-300 group-hover:scale-105 transition-transform duration-300">3D</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  3D Printing
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Functional prints & creative experiments with FDM and resin printers</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded">Maker</span>
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded">Design</span>
                </div>
              </div>
            </Link>

            {/* Travel Map Card */}
            <Link
              href="/travel"
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 group-hover:scale-105 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  Travel Map
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Exploring the United States one state at a time</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded">Adventure</span>
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded">Photography</span>
                </div>
              </div>
            </Link>

            {/* She Got Buckets Card */}
            <Link
              href="/basketball"
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 group-hover:scale-105 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  She Got Buckets
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">Building community for women in basketball and sports</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded">Community</span>
                  <span className="text-xs font-medium px-2 py-1 bg-primary-50 text-primary-700 rounded">Sports</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Let's Talk CTA */}
      <section className="py-10 md:py-14">
        <div className="container-wide text-center">
          <Link href="/coffee" className="block group">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-primary-900 transition-all">
              Let&apos;s talk Let&apos;s talk
            </h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
