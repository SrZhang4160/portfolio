import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  featured?: boolean;
  tags: string[];
  thumbnail: string;
  hero: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  impact: Array<{ metric: string; label: string }>;
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  slug: string;
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const workDir = path.join(contentDirectory, "work");

  if (!fs.existsSync(workDir)) {
    return [];
  }

  const files = fs.readdirSync(workDir).filter((file) => file.endsWith(".mdx"));

  const caseStudies = files.map((file) => {
    const filePath = path.join(workDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as CaseStudyFrontmatter,
      content,
      slug: file.replace(".mdx", ""),
    };
  });

  return caseStudies.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  const filePath = path.join(contentDirectory, "work", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as CaseStudyFrontmatter,
    content,
    slug,
  };
}

export interface Print {
  slug: string;
  title: string;
  description: string;
  category: "functional" | "art" | "material";
  material: string;
  printer: string;
  date: string;
  images: string[];
  settings: {
    layerHeight: string;
    infill: string;
    supports: boolean;
    printTime: string;
  };
  notes?: string;
  stlLink?: string;
  featured?: boolean;
}

export async function getAllPrints(): Promise<Print[]> {
  const printsPath = path.join(contentDirectory, "prints", "prints.json");

  if (!fs.existsSync(printsPath)) {
    return [];
  }

  const fileContent = fs.readFileSync(printsPath, "utf-8");
  const data = JSON.parse(fileContent);

  return data.prints || [];
}

export async function getPrintBySlug(slug: string): Promise<Print | null> {
  const prints = await getAllPrints();
  return prints.find((print) => print.slug === slug) || null;
}

export interface StateData {
  id: string;
  name: string;
  status: "visited" | "wishlist" | "none";
  visitDate?: string;
  highlights?: string[];
  notes?: string;
  recommendationRequest?: string;
}

export async function getTravelStates(): Promise<StateData[]> {
  const statesPath = path.join(contentDirectory, "travel", "states.json");

  if (!fs.existsSync(statesPath)) {
    return [];
  }

  const fileContent = fs.readFileSync(statesPath, "utf-8");
  const data = JSON.parse(fileContent);

  return data.states || [];
}

export interface BookData {
  currentlyReading?: {
    title: string;
    author: string;
    cover: string;
    progress: number;
    notes?: string;
  };
  recentlyFinished?: Array<{
    title: string;
    author: string;
    cover: string;
    rating: number;
    notes?: string;
  }>;
  upNext?: Array<{
    title: string;
    author: string;
    cover: string;
  }>;
}

export async function getBookData(): Promise<BookData> {
  const booksPath = path.join(contentDirectory, "books", "reading.json");

  if (!fs.existsSync(booksPath)) {
    return {};
  }

  const fileContent = fs.readFileSync(booksPath, "utf-8");
  return JSON.parse(fileContent);
}
