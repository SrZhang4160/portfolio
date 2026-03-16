import StatCard from "./StatCard";

interface Stat {
  value: string;
  label: string;
}

interface StatCardsProps {
  stats: Stat[];
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}
