interface CalloutBlockProps {
  label: string;
  children: React.ReactNode;
}

export default function CalloutBlock({ label, children }: CalloutBlockProps) {
  return (
    <div className="bg-accent-100 border-l-4 border-accent-600 rounded-lg p-5 my-6">
      <div className="text-xs font-semibold text-accent-600 uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className="text-sm md:text-base text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
