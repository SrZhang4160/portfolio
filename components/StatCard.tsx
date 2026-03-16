interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
      <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
        {value}
      </div>
      <div className="text-xs md:text-sm text-gray-600">{label}</div>
    </div>
  );
}
