import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Basketball",
  description:
    "She Got Buckets - Sharon Zhang's community basketball initiative empowering women in sports.",
};

export default function BasketballPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <section className="bg-accent-400 text-white py-16 md:py-24 -mt-16 mb-16">
        <div className="container-wide">
          <div className="max-w-3xl">
            <div className="text-6xl mb-6">🏀</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              She Got Buckets
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Empowering women through basketball. Creating space for players
              of all skill levels to enjoy the game, build community, and
              develop confidence on and off the court.
            </p>
            <Link
              href="/discuss/life-balance"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-accent-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Join the Conversation
            </Link>
          </div>
        </div>
      </section>

      <div className="container-wide">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">Our Story</h2>
          <div className="prose max-w-3xl">
            <p>
              She Got Buckets started as a simple idea: create a welcoming space
              for women to play basketball without judgment or intimidation. Too
              often, women&apos;s basketball is overlooked, and recreational spaces
              can feel unwelcoming to those who aren&apos;t already confident players.
            </p>
            <p>
              What began as informal pickup games with friends has grown into a
              community of women supporting each other on and off the court. We
              believe that basketball is more than a sport—it&apos;s a way to build
              confidence, forge friendships, and maintain balance in busy lives.
            </p>
            <p>
              Today, She Got Buckets hosts regular pickup games, skill sessions
              for beginners, and community events. Whether you&apos;re a former
              college player or have never touched a basketball, there&apos;s a place
              for you here.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🏃‍♀️</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Pickup Games
              </h3>
              <p className="text-gray-600">
                Regular pickup games organized by skill level. Competitive or
                casual—you choose your vibe.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Skill Sessions
              </h3>
              <p className="text-gray-600">
                Beginner-friendly clinics covering fundamentals. Learn to
                dribble, shoot, and play defense.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                Community Events
              </h3>
              <p className="text-gray-600">
                Tournaments, watch parties, and social gatherings. Basketball
                brings us together.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16 bg-primary-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Inclusivity First
              </h3>
              <p className="text-gray-600">
                Every woman is welcome, regardless of skill level, background,
                or experience. No gatekeeping here.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Growth Mindset
              </h3>
              <p className="text-gray-600">
                We celebrate effort and improvement, not just natural talent.
                Everyone has room to grow.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Support Over Competition
              </h3>
              <p className="text-gray-600">
                While we love competitive play, building each other up always
                comes first.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Fun is Non-Negotiable
              </h3>
              <p className="text-gray-600">
                At the end of the day, we&apos;re here to have fun and enjoy the
                game we love.
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery Placeholder */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-8">
            In Action
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-400">Photo {i}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-4">
            Photos from recent events coming soon!
          </p>
        </section>

        {/* Join Us */}
        <section className="bg-accent-100 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            Want to Play?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking to join a game, volunteer, or just learn
            more about She Got Buckets, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?subject=She Got Buckets"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/discuss/life-balance"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Join Life Balance Forum
            </Link>
          </div>
        </section>

        {/* Personal Note */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold text-primary-900 mb-4">
            Why Basketball Matters to Me
          </h2>
          <div className="prose">
            <p>
              Growing up, I was always active but never felt like a &ldquo;real
              athlete.&rdquo; It wasn&apos;t until I found basketball in my twenties that
              I discovered the joy of team sports and the confidence that comes
              from improving at something difficult.
            </p>
            <p>
              Basketball has become my antidote to the sedentary nature of tech
              work. It&apos;s how I stay active, de-stress after long days of
              coding, and connect with an amazing community of women.
            </p>
            <p>
              She Got Buckets is my way of paying forward the welcome I received
              when I was a nervous beginner. If I can help one more woman fall
              in love with basketball, it&apos;s all worth it.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
