import { useEffect, useState } from "react";

export function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target == null) return;

    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      setValue(start);
      if (start >= target) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [target, active, duration]);

  return value;
}
