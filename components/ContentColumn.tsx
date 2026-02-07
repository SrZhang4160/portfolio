"use client";

import Image from "next/image";
import Link from "next/link";
import MessageBoard from "./MessageBoard";

interface ContentColumnProps {
  activeSection: string;
}

interface ContentItem {
  id: string;
  href?: string;
  label: string;
  placeholder?: boolean;
}

const contentBySection: Record<string, ContentItem[]> = {
  info: [
    { id: "info-1", label: "Johns Hopkins", placeholder: true },
    { id: "info-2", label: "MechE → Software", placeholder: true },
    { id: "info-3", label: "4+ Years Healthcare", placeholder: true },
  ],
  work: [
    { id: "work-1", href: "/work/autobrachy", label: "AutoBrachy" },
    { id: "work-2", href: "/work/medical-image-viewer", label: "Medical Imaging" },
    { id: "work-3", href: "/work/dicom-architecture", label: "Infrastructure" },
    { id: "work-4", href: "/work/glaucoma-life", label: "Patient Tools" },
  ],
  beyond: [
    { id: "beyond-1", href: "/prints", label: "3D Printing" },
    { id: "beyond-2", href: "/travel", label: "Travel Map" },
    { id: "beyond-3", href: "/basketball", label: "Basketball" },
  ],
  contact: [
    { id: "contact-1", href: "/coffee", label: "Schedule a Chat" },
  ],
};

function ContentCard({ item }: { item: ContentItem }) {
  const content = (
    <div className="group relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all">
      {/* Placeholder content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-400 text-sm font-medium">{item.label}</span>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </div>
  );

  if (item.href) {
    return <Link href={item.href}>{content}</Link>;
  }

  return content;
}

function HomeContent() {
  return (
    <div className="h-1/2 flex flex-col items-end pt-24">
      {/* Photo - half width, original ratio, right-aligned */}
      <div className="w-1/2">
        <Image
          src="/images/portrait.jpg"
          alt="Sharon Zhang"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto rounded-lg"
          unoptimized
          priority
        />
      </div>
      {/* Bio lines */}
      <div className="mt-4 w-full text-right justify-end gap-2">
        <p className="text-medium text-gray-600">Healthcare Software Engineer</p>
        <p className="text-medium text-gray-500">Based in DMV</p>
      </div>
    </div>
  );
}

export default function ContentColumn({ activeSection }: ContentColumnProps) {
  if (activeSection === "home") {
    return <HomeContent />;
  }

  if (activeSection === "beyond") {
    return <MessageBoard />;
  }

  if (activeSection === "contact") {
    return null;
  }

  const items = contentBySection[activeSection] || [];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
