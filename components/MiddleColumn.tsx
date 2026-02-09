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
      {/* Intro */}
      <div className="mb-6 py-4 md:py-8 px-2 md:px-4">
        <p className="text-xl md:text-2xl leading-relaxed">
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

      {/* Background */}
      <div className="mb-6 px-2 md:px-4">
        <h2 className="text-base font-medium text-gray-400 uppercase tracking-wider mb-3">Background</h2>
        <div className="space-y-2 text-lg text-gray-700">
          <p>
            <span className="font-medium text-primary-900">Johns Hopkins</span> — Medical Robotics
          </p>
          <p>
            <span className="font-medium text-primary-900">4+ years</span> building healthcare software
          </p>
          <p>
            <span className="font-medium text-primary-900">Currently</span> — Senior Software Engineer at Carina AI
          </p>
        </div>
      </div>

      {/* What I Do */}
      <div className="mb-6 px-2 md:px-4">
        <h2 className="text-base font-medium text-gray-400 uppercase tracking-wider mb-3">What I Do</h2>
        <div className="space-y-1 text-lg">
          <p className="text-gray-700">Healthcare AI & treatment planning</p>
          <p className="text-gray-700">Medical imaging & DICOM systems</p>
          <p className="text-gray-700">Full-stack development & infrastructure</p>
          <p className="text-gray-700">Patient-facing tools & mobile apps</p>
        </div>
      </div>

      {/* Values & Principles */}
      <div className="px-2 md:px-4">
        <h2 className="text-base font-medium text-gray-400 uppercase tracking-wider mb-3">Values & Principles</h2>
        <div className="space-y-2 text-lg">
          <div>
            <span className="font-medium text-primary-900">Persistence</span>
            <span className="text-base text-gray-600"> — Keep iterating until it works. Failures are just data points.</span>
          </div>
          <div>
            <span className="font-medium text-primary-900">Bias for Action</span>
            <span className="text-base text-gray-600"> — Ship early, learn fast, improve constantly.</span>
          </div>
          <div>
            <span className="font-medium text-primary-900">Patient-First</span>
            <span className="text-base text-gray-600"> — Every line of code should serve the end user.</span>
          </div>
          <div>
            <span className="font-medium text-primary-900">Stay Curious</span>
            <span className="text-base text-gray-600"> — Always learning, always growing.</span>
          </div>
        </div>
      </div>
    </>
  );
}

function WorkSection() {
  return (
    <div className="flex flex-col h-full">
      {/* Quote */}
      <div className="mb-6 py-4 md:py-8">
        <blockquote className="text-xl md:text-2xl font-medium text-primary-900 leading-relaxed">
          &ldquo;I don&apos;t care if I miss 100 shots in a row, I&apos;m never gonna stop shooting.&rdquo;
        </blockquote>
        <p className="text-gray-500 mt-3">— Klay Thompson</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-primary-900 mb-1">Featured Work</h2>
        <p className="text-gray-600 text-sm">Healthcare AI projects with real-world impact</p>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <Link href="/work/medical-image-viewer" className="block group flex-1">
          <div className="h-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col justify-center">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-base font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                3D Medical Image Viewer
              </h3>
              <span className="text-xs text-gray-400">2025</span>
            </div>
            <p className="text-gray-600 text-sm">
              Cross-platform DICOM visualization with GPU-accelerated rendering
            </p>
          </div>
        </Link>

        <Link href="/work/dicom-architecture" className="block group flex-1">
          <div className="h-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col justify-center">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-base font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                DICOM Retrieval Architecture
              </h3>
              <span className="text-xs text-gray-400">2024</span>
            </div>
            <p className="text-gray-600 text-sm">
              Enterprise medical data infrastructure for distributed hospital networks
            </p>
          </div>
        </Link>

        <Link href="/work/autobrachy" className="block group flex-1">
          <div className="h-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col justify-center">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-base font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                AutoBrachy
              </h3>
              <span className="text-xs text-gray-400">2023 - Present</span>
            </div>
            <p className="text-gray-600 text-sm">
              Automated brachytherapy planning system for cancer treatment using AI
            </p>
          </div>
        </Link>
        
        <Link href="/work/glaucoma-life" className="block group flex-1">
          <div className="h-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col justify-center">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-base font-medium text-primary-900 group-hover:text-gray-600 transition-colors">
                GlaucomaLife
              </h3>
              <span className="text-xs text-gray-400">2025 - Present</span>
            </div>
            <p className="text-gray-600 text-sm">
              Patient education & monitoring app for glaucoma management
            </p>
          </div>
        </Link>
      </div>
    </div>
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
      {activeSection !== "contact" && <LetsTalkMarquee />}
    </div>
  );
}
