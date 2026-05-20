export function Skeleton({ className = "", style = {} }) {
  return <div className={`skeleton ${className}`.trim()} style={style} aria-hidden="true" />;
}

export function ServiceGridSkeleton() {
  return (
    <div className="service-grid-skeleton" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="service-skeleton-cell">
          <Skeleton style={{ width: 40, height: 40, borderRadius: 8, marginBottom: 18 }} />
          <Skeleton style={{ width: "55%", height: 16, marginBottom: 10 }} />
          <Skeleton style={{ width: "100%", height: 12, marginBottom: 6 }} />
          <Skeleton style={{ width: "88%", height: 12, marginBottom: 20 }} />
          <Skeleton style={{ width: 90, height: 12 }} />
        </div>
      ))}
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="products-list" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <article key={i} className="product-row product-skeleton-row">
          <div className="product-skeleton-text">
            <Skeleton style={{ width: 120, height: 24, marginBottom: 16 }} />
            <Skeleton style={{ width: "70%", height: 32, marginBottom: 12 }} />
            <Skeleton style={{ width: "100%", height: 14, marginBottom: 8 }} />
            <Skeleton style={{ width: "92%", height: 14, marginBottom: 24 }} />
            <Skeleton style={{ width: 140, height: 40, borderRadius: 6 }} />
          </div>
          <Skeleton className="product-skeleton-logo" />
        </article>
      ))}
    </div>
  );
}
