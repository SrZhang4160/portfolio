import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import PageLeftColumn from "@/components/PageLeftColumn";
import PageRightColumn from "@/components/PageRightColumn";
import InfoCard from "@/components/InfoCard";

const basketballImages = [
  "/images/basketball/basketball1.jpg",
  "/images/basketball/basketball2.jpg",
  "/images/basketball/basketball3.jpg",
  "/images/basketball/basketball4.jpg",
  "/images/basketball/basketball5.jpg",
  "/images/basketball/basketball6.jpg",
];

export const metadata: Metadata = {
  title: "Basketball",
  description:
    "Sharon Zhang's basketball journey - from childhood passion to community building and advocacy for women in basketball.",
};

function LeftColumn() {
  return (
    <PageLeftColumn
      title="Basketball"
      description="A lifelong passion that shaped who I am - building strength, resilience, and community."
      backLink={{ href: "/?section=beyond", label: "Back to Beyond" }}
      tags={["CUBA 2016-2021", "JHU 2021-Present"]}
    />
  );
}

function MiddleColumn() {
  return (
    <div className="space-y-6">
      {/* My Basketball Story */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-3">My Basketball Story</h2>
        <div className="text-gray-600 space-y-3 w-full">
          <p>
            I&apos;ve been playing basketball since I was young, and it&apos;s become
            so much more than just a sport to me. On the court, I learned how to push
            through when things get tough, how to trust my teammates, and how to pick
            myself up after a loss.
          </p>
          <p>
            Basketball taught me a strong mindset and gave me a strong body. The discipline
            of practice, the thrill of competition, and the camaraderie of team sports -
            these experiences shaped who I am today. There&apos;s nothing quite like the
            energy of playing with friends who share your passion.
          </p>
          <p>
            Now, it&apos;s also my antidote to the sedentary nature of tech work. It&apos;s
            how I stay active, de-stress, and maintain the team-oriented mindset that
            makes me better at everything I do.
          </p>
        </div>
      </section>

      {/* Why I Care */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-3">Why I Care About Women&apos;s Basketball</h2>
        <div className="text-gray-600 space-y-3 w-full">
          <p>
            The numbers tell a story that needs to change: less than 10% of NCAA Asian
            female athletes compete in basketball, and only 1.4% of WNBA players are Asian.
            Women&apos;s basketball doesn&apos;t get the visibility and support it deserves.
          </p>
          <p>
            This isn&apos;t just about statistics - it&apos;s about the girls who never
            see themselves represented, who don&apos;t have communities to play with, or
            who feel like basketball &quot;isn&apos;t for them.&quot; I want to help change that.
          </p>
        </div>
      </section>

      {/* Building Community */}
      <section>
        <h2 className="text-xl font-semibold text-primary-900 mb-3">Building Community</h2>
        <p className="text-gray-600 mb-3">
          My passion for basketball naturally led me to build and support communities
          where others can experience the same joy I found in the sport.
        </p>

        {/* JHU Chinese Basketball Team */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
          <h3 className="font-semibold text-primary-900 mb-2">JHU Chinese Basketball Team</h3>
          <p className="text-gray-600 text-sm mb-2">
            I&apos;ve been organizing the JHU Chinese Basketball Team since 2021. What
            started as casual pickup games has grown into a welcoming community for
            players of all skill levels.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Alumni welcome!</strong> If you&apos;re a JHU alum who loves basketball,
            I&apos;d love to have you join us.{" "}
            <Link href="/contact?subject=JHU Basketball" className="text-accent-600 hover:text-accent-700">
              Get in touch →
            </Link>
          </p>
        </div>

        {/* She Got Buckets */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-primary-900 mb-2">She Got Buckets Volunteering</h3>
          <p className="text-gray-600 text-sm mb-2">
            I&apos;m proud to be part of the fundraising team at{" "}
            <a
              href="https://www.shegotbuckets.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 hover:text-accent-700"
            >
              She Got Buckets
            </a>
            , a 501(c)(3) nonprofit empowering Asian women through basketball.
          </p>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>• Organized community events and pickup games</li>
            <li>• Recruited stats table volunteers for game operations</li>
            <li>• Built high school volunteer partnerships</li>
            <li>• Secured hotel and restaurant collaborations</li>
            <li>• Connected sponsors to support the mission</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function RightColumn() {
  return (
    <PageRightColumn>
      {/* Photo Gallery */}
      <InfoCard title="On the Court">
        <div className="grid grid-cols-2 gap-1">
          {basketballImages.slice(0, 4).map((src, i) => (
            <div
              key={i}
              className="aspect-square relative rounded overflow-hidden"
            >
              <Image
                src={src}
                alt={`Basketball ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </InfoCard>

      {/* What Basketball Gave Me */}
      <InfoCard title="What Basketball Gave Me">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium text-primary-900">Mindset</span>
            <span className="text-gray-500"> · Resilience</span>
          </div>
          <div>
            <span className="font-medium text-primary-900">Body</span>
            <span className="text-gray-500"> · Fitness</span>
          </div>
          <div>
            <span className="font-medium text-primary-900">Teamwork</span>
            <span className="text-gray-500"> · Trust</span>
          </div>
          <div>
            <span className="font-medium text-primary-900">Community</span>
            <span className="text-gray-500"> · Friends</span>
          </div>
        </div>
      </InfoCard>

      {/* Join Us CTA */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold text-primary-900 text-sm mb-1">Let&apos;s Play!</h3>
        <p className="text-xs text-gray-700 mb-3">
          JHU alum? Interested in She Got Buckets?
        </p>
        <Link
          href="/contact?subject=Basketball"
          className="inline-flex items-center justify-center w-full px-3 py-2 bg-gray-700 text-white font-medium text-xs rounded-lg hover:bg-gray-800 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </PageRightColumn>
  );
}

export default function BasketballPage() {
  return (
    <ThreeColumnLayout
      leftColumn={<LeftColumn />}
      middleColumn={<MiddleColumn />}
      rightColumn={<RightColumn />}
    />
  );
}
