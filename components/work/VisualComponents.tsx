"use client";

import { useState } from "react";

// StatRow - Key metrics display
interface StatRowProps {
  stats: Array<{ metric: string; label: string }>;
}

export function StatRow({ stats }: StatRowProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-sm p-5 text-center border border-gray-200"
        >
          <div className="text-3xl font-bold text-accent-600 mb-1">
            {stat.metric}
          </div>
          <div className="text-xs text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// ProblemGrid - Display problem context
interface ProblemGridProps {
  items: Array<{
    title: string;
    content: string;
    highlight?: boolean;
  }>;
}

export function ProblemGrid({ items }: ProblemGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-5 border ${
            item.highlight
              ? "bg-accent-100 border-accent-200"
              : "bg-white border-gray-200"
          }`}
        >
          <h3 className="font-semibold text-primary-900 mb-2 text-sm">
            {item.title}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

// CalloutBox - Highlighted content
interface CalloutBoxProps {
  children: React.ReactNode;
  variant?: "default" | "highlight";
}

export function CalloutBox({ children, variant = "default" }: CalloutBoxProps) {
  const bgClass = variant === "highlight" ? "bg-accent-100 border-accent-600" : "bg-gray-50 border-gray-300";

  return (
    <div className={`${bgClass} border-l-4 rounded-lg p-5 my-6 text-sm leading-relaxed text-gray-700`}>
      {children}
    </div>
  );
}

// InsightList - Numbered insights
interface InsightListProps {
  items: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export function InsightList({ items }: InsightListProps) {
  return (
    <div className="space-y-4 my-8">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold text-sm">
            {item.number}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-900 mb-1">{item.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// TechEvalGrid - Technology evaluation
interface TechEvalGridProps {
  technologies: Array<{
    name: string;
    description: string;
    chosen?: boolean;
  }>;
}

export function TechEvalGrid({ technologies }: TechEvalGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      {technologies.map((tech, idx) => (
        <div
          key={idx}
          className={`rounded-lg p-5 border ${
            tech.chosen
              ? "bg-green-50 border-green-200"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-primary-900">{tech.name}</h4>
            {tech.chosen && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">
                Chosen
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{tech.description}</p>
        </div>
      ))}
    </div>
  );
}

// TabSection - Tabbed content
interface TabSectionProps {
  tabs: Array<{
    name: string;
    content: React.ReactNode;
  }>;
}

export function TabSection({ tabs }: TabSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === idx
                ? "border-primary-900 text-primary-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

// FlowDiagram - Simple flow visualization
interface FlowDiagramProps {
  steps: string[];
  twoColumn?: boolean;
}

export function FlowDiagram({ steps, twoColumn = false }: FlowDiagramProps) {
  if (twoColumn) {
    const mid = Math.ceil(steps.length / 2);
    const left = steps.slice(0, mid);
    const right = steps.slice(mid);

    return (
      <div className="grid md:grid-cols-2 gap-8 my-6">
        <div className="space-y-2">
          {left.map((step, idx) => (
            <div key={idx}>
              <div className="bg-primary-50 border border-primary-200 rounded px-3 py-2 text-sm text-gray-700">
                {step}
              </div>
              {idx < left.length - 1 && (
                <div className="text-center text-primary-400 text-sm my-1">↓</div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((step, idx) => (
            <div key={idx}>
              <div className="bg-primary-50 border border-primary-200 rounded px-3 py-2 text-sm text-gray-700">
                {step}
              </div>
              {idx < right.length - 1 && (
                <div className="text-center text-primary-400 text-sm my-1">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 my-6">
      {steps.map((step, idx) => (
        <div key={idx}>
          <div className="bg-primary-50 border border-primary-200 rounded px-3 py-2 text-sm text-gray-700">
            {step}
          </div>
          {idx < steps.length - 1 && (
            <div className="text-center text-primary-400 text-sm my-1">↓</div>
          )}
        </div>
      ))}
    </div>
  );
}

// StepCard - Numbered step card
interface StepCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}

export function StepCard({ number, title, children, highlight = false }: StepCardProps) {
  return (
    <div
      className={`rounded-lg p-5 border my-4 ${
        highlight
          ? "bg-accent-100 border-accent-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold text-xs">
          {number}
        </div>
        <h4 className="font-semibold text-primary-900 flex-1">{title}</h4>
      </div>
      <div className="ml-9 text-sm text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

// CodeDiff - Before/after code comparison
interface CodeDiffProps {
  before: string[];
  after: string[];
}

export function CodeDiff({ before, after }: CodeDiffProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <div>
        <div className="text-xs font-semibold text-red-700 mb-2">Before (incorrect)</div>
        <pre className="bg-red-50 border border-red-200 text-xs p-3 rounded overflow-x-auto">
          {before.map((line, idx) => (
            <div key={idx} className="text-gray-800">
              {line}
            </div>
          ))}
        </pre>
      </div>
      <div>
        <div className="text-xs font-semibold text-green-700 mb-2">After (fixed)</div>
        <pre className="bg-green-50 border border-green-200 text-xs p-3 rounded overflow-x-auto">
          {after.map((line, idx) => (
            <div key={idx} className="text-gray-800">
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// PullQuote - Highlighted quote
interface PullQuoteProps {
  children: React.ReactNode;
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="border-l-4 border-primary-900 pl-5 py-2 my-6 italic text-gray-700 text-base leading-relaxed">
      {children}
    </blockquote>
  );
}

// TwoColumnCompare - Side by side comparison
interface TwoColumnCompareProps {
  left: {
    title: string;
    items: string[];
  };
  right: {
    title: string;
    items: string[];
  };
}

export function TwoColumnCompare({ left, right }: TwoColumnCompareProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h4 className="font-semibold text-primary-900 mb-4">{left.title}</h4>
        <ul className="space-y-2">
          {left.items.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h4 className="font-semibold text-primary-900 mb-4">{right.title}</h4>
        <ul className="space-y-2">
          {right.items.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// LearningGrid - Key learnings display
interface LearningGridProps {
  learnings: Array<{
    title: string;
    description: string;
  }>;
}

export function LearningGrid({ learnings }: LearningGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {learnings.map((learning, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
        >
          <h4 className="font-semibold text-primary-900 mb-2">{learning.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{learning.description}</p>
        </div>
      ))}
    </div>
  );
}
