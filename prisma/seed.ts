import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.forumReply.deleteMany();
  await prisma.forumThread.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.coffeeChatRequest.deleteMany();
  await prisma.adminSession.deleteMany();

  // Create forum threads
  const aiHealthcareThread1 = await prisma.forumThread.create({
    data: {
      topic: "ai-healthcare",
      title: "The Future of AI in Medical Imaging",
      content: `I've been working on AI systems for radiology for the past few years, and the progress has been remarkable. What areas do you think will see the biggest impact in the next 5 years?

Some possibilities I'm excited about:
- Earlier cancer detection through improved screening
- Reducing radiologist burnout through automated prioritization
- Bringing diagnostic capabilities to underserved areas

What are your thoughts?`,
      authorName: "Sharon Zhang",
      authorEmail: "sharon@example.com",
      status: "approved",
    },
  });

  await prisma.forumReply.create({
    data: {
      content:
        "I think the biggest impact will be in accessibility. AI can help bring expert-level diagnostics to rural hospitals that don't have specialists on staff. The challenge will be maintaining quality and trust.",
      authorName: "Alex Chen",
      threadId: aiHealthcareThread1.id,
      status: "approved",
    },
  });

  await prisma.forumReply.create({
    data: {
      content:
        "Great points! I'd add that AI-assisted surgical planning could be transformative. Being able to visualize and plan complex procedures in 3D before stepping into the OR would be huge.",
      authorName: "Dr. Maya Patel",
      threadId: aiHealthcareThread1.id,
      status: "approved",
    },
  });

  const printingThread1 = await prisma.forumThread.create({
    data: {
      topic: "3d-printing",
      title: "Best practices for multi-color prints?",
      content: `I just got an AMS for my X1C and I'm excited to try some multi-color prints. Any tips for getting clean color transitions?

I've heard that:
- Purge towers are essential
- Some filament combinations work better than others
- Design matters a lot for clean transitions

Would love to hear your experiences!`,
      authorName: "PrinterNewbie",
      status: "approved",
    },
  });

  await prisma.forumReply.create({
    data: {
      content:
        "The biggest tip I can give is to design your models with color changes in mind. Try to have color transitions happen at natural boundaries in your model. Also, definitely enable the purge tower - the waste is worth it for clean prints!",
      authorName: "ColorMaster",
      threadId: printingThread1.id,
      status: "approved",
    },
  });

  const lifeBalanceThread1 = await prisma.forumThread.create({
    data: {
      topic: "life-balance",
      title: "How do you stay active with a desk job?",
      content: `As someone who spends 8+ hours a day coding, I've found it challenging to maintain an active lifestyle. Basketball has been my answer, but I'm curious what works for others.

How do you incorporate movement into your day?`,
      authorName: "Sharon Zhang",
      authorEmail: "sharon@example.com",
      status: "approved",
    },
  });

  await prisma.forumReply.create({
    data: {
      content:
        "Standing desk + walking meetings have been game changers for me. I also try to take a short walk after lunch. It's amazing how much those small changes add up!",
      authorName: "WalkingCoder",
      threadId: lifeBalanceThread1.id,
      status: "approved",
    },
  });

  await prisma.forumReply.create({
    data: {
      content:
        "I started swimming during lunch breaks. Our office has a gym nearby and that hour in the pool completely refreshes my mind for the afternoon. Highly recommend finding a midday activity!",
      authorName: "SwimmerDev",
      threadId: lifeBalanceThread1.id,
      status: "approved",
    },
  });

  // Create sample comments
  await prisma.comment.create({
    data: {
      content:
        "This case study is really inspiring! The 40% improvement in planning time must have made a huge difference for the clinical teams.",
      authorName: "John Reader",
      targetType: "work",
      targetSlug: "autobrachy",
      status: "approved",
    },
  });

  await prisma.comment.create({
    data: {
      content:
        "I love the Doraemon lamp! What LEDs did you use for the internal lighting?",
      authorName: "LED Enthusiast",
      targetType: "print",
      targetSlug: "doraemon-lamp",
      status: "approved",
    },
  });

  // Create a pending comment for testing moderation
  await prisma.comment.create({
    data: {
      content: "Great work! Would love to see more details about the ML pipeline.",
      authorName: "ML Curious",
      targetType: "work",
      targetSlug: "radiology",
      status: "pending",
    },
  });

  // Create a sample contact submission
  await prisma.contactSubmission.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      subject: "Collaboration Inquiry",
      message:
        "Hi Sharon, I'm interested in discussing potential collaboration opportunities in healthcare AI. Would love to connect!",
      status: "unread",
    },
  });

  // Create a sample coffee chat request
  await prisma.coffeeChatRequest.create({
    data: {
      name: "Aspiring Engineer",
      email: "aspiring@example.com",
      company: "University",
      role: "Graduate Student",
      topic: "Career advice for transitioning into healthcare robotics",
      preferredTime: "Weekday afternoons",
      additionalNotes:
        "I'm currently finishing my MS in robotics and would love to learn about your career path.",
      status: "pending",
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
