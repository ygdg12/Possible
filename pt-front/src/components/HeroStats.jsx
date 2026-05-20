import { useInView } from "../hooks/useInView.js";
import { useCountUp } from "../hooks/useCountUp.js";
import { heroStats } from "../data/siteData.js";

function StatItem({ stat, Ico }) {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const count = useCountUp(stat.target, inView && stat.target != null);

  const display =
    stat.symbol != null
      ? stat.symbol
      : `${count}${stat.suffix || ""}`;

  return (
    <div ref={ref} className="hero-stats-item">
      <div className="hero-stats-icon">
        <Ico name={stat.icon} size={15} />
      </div>
      <div className="hero-stats-value" aria-label={stat.label}>
        {display}
      </div>
      <div className="hero-stats-label">{stat.label}</div>
    </div>
  );
}

export default function HeroStats({ Ico }) {
  return (
    <div className="hero-stats">
      <div className="hero-stats-grid">
        {heroStats.map((s) => (
          <StatItem key={s.label} stat={s} Ico={Ico} />
        ))}
      </div>
    </div>
  );
}
