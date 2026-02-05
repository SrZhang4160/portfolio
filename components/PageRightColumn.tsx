interface PageRightColumnProps {
  children: React.ReactNode;
}

export default function PageRightColumn({ children }: PageRightColumnProps) {
  return (
    <div className="flex flex-col h-full space-y-6">
      {children}
    </div>
  );
}
