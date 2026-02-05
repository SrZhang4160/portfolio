interface InfoCardItem {
  label: string;
  value: string | React.ReactNode;
}

interface InfoCardProps {
  title: string;
  items?: InfoCardItem[];
  children?: React.ReactNode;
  variant?: "default" | "highlight";
}

export default function InfoCard({
  title,
  items,
  children,
  variant = "default",
}: InfoCardProps) {
  const bgClass = variant === "highlight" ? "bg-accent-100" : "bg-white";

  return (
    <div className={`${bgClass} rounded-lg shadow-sm p-5`}>
      <h3 className="font-semibold text-primary-900 mb-4 text-sm">
        {title}
      </h3>
      {items && items.length > 0 && (
        <dl className="space-y-3">
          {items.map((item, index) => (
            <div key={index}>
              <dt className="text-xs text-gray-500">{item.label}</dt>
              <dd className="font-medium text-primary-900 text-sm">{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </div>
  );
}
