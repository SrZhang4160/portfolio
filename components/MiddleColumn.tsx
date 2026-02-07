"use client";

import Link from "next/link";
import Image from "next/image";
import ContactForm from "./ContactForm";

interface MiddleColumnProps {
  activeSection: string;
}

function HomeSection() {
  return (
    <>
      {/* Intro - Maelle style */}
      <div className="mb-8 md:mb-12 py-8 md:py-20 px-2 md:px-4">
        <p className="text-lg md:text-2xl leading-relaxed">
          <span className="font-semibold text-primary-900">
            Software engineer, problem-solver, healthcare advocate with 4 years experience building medical software
          </span>{" "}
          <span className="text-gray-400">
            that makes a difference—from imaging platforms to AI-powered patient tools.
          </span>{" "}
          <span className="text-gray-500">
            Passionate about bridging the gap between medicine and technology.
          </span>
        </p>
      </div>

      {/* Selected Work */}
      <div className="mb-8 md:mb-12 px-2 md:px-4">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 md:mb-6">
          Selected Work
        </h2>
        <div className="space-y-4 md:space-y-6">
          <Link href="/work/autobrachy" className="block group">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base md:text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                AutoBrachy
              </h3>
              <span className="text-sm text-gray-400">Carina AI</span>
            </div>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              AI-powered brachytherapy planning for cancer treatment
            </p>
          </Link>
          <Link href="/work/medical-image-viewer" className="block group">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base md:text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                3D Medical Image Viewer
              </h3>
              <span className="text-sm text-gray-400">Medical Imaging</span>
            </div>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              GPU-accelerated DICOM visualization platform
            </p>
          </Link>
          <Link href="/work/glaucoma-life" className="block group">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-base md:text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                GlaucomaLife
              </h3>
              <span className="text-sm text-gray-400">Patient Tools</span>
            </div>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Patient education and monitoring mobile app
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

function InfoSection() {
  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">My Journey</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            My path into healthcare software began with a mechanical engineering degree at Johns Hopkins,
            where I discovered my passion for building systems that directly impact patient care.
          </p>
          <p>
            Over 4+ years, I&apos;ve worked across the healthcare technology stack — from AI-powered
            treatment planning systems to high-performance medical imaging viewers and enterprise
            data infrastructure.
          </p>
          <p>
            Today at Carina AI, I lead development on AutoBrachy, an automated brachytherapy
            planning system that has treated 2,500+ cancer patients across 12 clinical sites.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">Technical Focus</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Healthcare AI</h3>
            <p className="text-sm text-gray-600">Treatment planning, dose optimization, clinical decision support</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Medical Imaging</h3>
            <p className="text-sm text-gray-600">DICOM visualization, 3D reconstruction, GPU-accelerated rendering</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Systems Architecture</h3>
            <p className="text-sm text-gray-600">Distributed systems, data infrastructure, clinical integrations</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-6">What Drives Me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Impact-Driven</h3>
            <p className="text-sm text-gray-600">Measuring success by patient outcomes</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Rigorous</h3>
            <p className="text-sm text-gray-600">Healthcare demands precision and reliability</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Collaborative</h3>
            <p className="text-sm text-gray-600">Working closely with clinicians and researchers</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-primary-900 mb-1">Always Learning</h3>
            <p className="text-sm text-gray-600">Healthcare tech evolves rapidly</p>
          </div>
        </div>
      </div>
    </>
  );
}

function WorkSection() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-900 mb-2">Work</h2>
        <p className="text-gray-600">Healthcare AI projects with real-world impact</p>
      </div>

      <div className="space-y-8">
        <Link href="/work/autobrachy" className="block group">
          <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                AutoBrachy
              </h3>
              <span className="text-sm text-gray-400">2023 - Present</span>
            </div>
            <p className="text-gray-600 mb-3">
              Automated brachytherapy planning system for cancer treatment using AI
            </p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Healthcare AI</span>
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Automation</span>
            </div>
          </div>
        </Link>

        <Link href="/work/medical-image-viewer" className="block group">
          <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                3D Medical Image Viewer
              </h3>
              <span className="text-sm text-gray-400">2022 - 2023</span>
            </div>
            <p className="text-gray-600 mb-3">
              Cross-platform DICOM visualization with GPU-accelerated rendering
            </p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Medical Imaging</span>
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">WebGL</span>
            </div>
          </div>
        </Link>

        <Link href="/work/dicom-architecture" className="block group">
          <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                DICOM Retrieval Architecture
              </h3>
              <span className="text-sm text-gray-400">2022</span>
            </div>
            <p className="text-gray-600 mb-3">
              Enterprise medical data infrastructure for distributed hospital networks
            </p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Systems</span>
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Infrastructure</span>
            </div>
          </div>
        </Link>

        <Link href="/work/glaucoma-life" className="block group">
          <div className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                GlaucomaLife
              </h3>
              <span className="text-sm text-gray-400">2021 - 2022</span>
            </div>
            <p className="text-gray-600 mb-3">
              Patient education & monitoring app for glaucoma management
            </p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Mobile App</span>
              <span className="text-xs px-2 py-1 bg-white rounded text-gray-500">Patient Tools</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

function BeyondSection() {
  const printImages = [
    "/images/prints/Labubu.jpg",
    "/images/prints/victory_glow.jpg",
    "/images/prints/ChiefsIcon.jpg",
  ];

  const basketballImages = [
    "/images/basketball/basketball4.jpg",
    "/images/basketball/basketball5.jpg",
    "/images/basketball/basketball6.jpg",
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-900 mb-2">Beyond Work</h2>
        <p className="text-gray-600">Hobbies and side projects that keep me inspired</p>
      </div>

      <div className="space-y-6">
        {/* Basketball Card */}
        <Link href="/basketball" className="block group">
          <div className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/9] relative overflow-hidden">
              <div className="grid grid-cols-3 h-full">
                {basketballImages.map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <Image
                      src={src}
                      alt={`Basketball ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors mb-2">
                Basketball Player
              </h3>
              <p className="text-gray-600 text-sm">
                Building community for women in basketball and sports. A welcoming space for players of all skill levels to enjoy the game, build confidence, and connect with others.
              </p>
            </div>
          </div>
        </Link>

        {/* 3D Printing Card */}
        <Link href="/prints" className="block group">
          <div className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/9] relative overflow-hidden">
              <div className="grid grid-cols-3 h-full">
                {printImages.map((src, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <Image
                      src={src}
                      alt={`3D Print ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors mb-2">
                Maker
              </h3>
              <p className="text-gray-600 text-sm">
                Functional prints & creative experiments. From household items to artistic creations, explore my collection of 3D printed projects with detailed settings and process notes.
              </p>
            </div>
          </div>
        </Link>

        {/* Travel Map Card */}
        <Link href="/travel" className="block group">
          <div className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                src="/images/travel-preview.png"
                alt="My Travel Map"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors mb-2">
                Traveller
              </h3>
              <p className="text-gray-600 text-sm">
                Exploring the United States one state at a time. Click to see where I&apos;ve been!
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

function ContactSection() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-900 mb-2">Get in Touch</h2>
        <p className="text-gray-600">Have a question or want to collaborate? Drop me a message.</p>
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Schedule a Coffee Chat */}
      <div className="mt-8">
        <Link
          href="/coffee"
          className="block p-6 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors group"
        >
          <h3 className="text-lg font-medium text-primary-900 group-hover:text-gray-600 transition-colors mb-2">
            Schedule a Coffee Chat
          </h3>
          <p className="text-gray-600 text-sm">
            Book a 30-minute virtual coffee to chat about anything.
          </p>
        </Link>
      </div>
    </>
  );
}

function LetsTalkMarquee() {
  return (
    <div className="mt-auto overflow-hidden py-8">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-text">
              Let&apos;s talk
            </span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="marquee-text">
              Let&apos;s talk
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MiddleColumn({ activeSection }: MiddleColumnProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "info":
        return <InfoSection />;
      case "work":
        return <WorkSection />;
      case "beyond":
        return <BeyondSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {renderSection()}
      {activeSection !== "contact" && activeSection !== "home" && <LetsTalkMarquee />}
    </div>
  );
}
