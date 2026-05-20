import { productItems } from "../data/siteData.js";

export default function ProductsSection({ Ico, subtleBg }) {
  return (
    <section
      id="products"
      className="offerings-section"
      style={{ background: subtleBg }}
    >
      <div className="section-wrap">
        <div className="offerings-header">
          <div className="section-tag">Our Products</div>
          <h2 className="display-heading" style={{ maxWidth: 560 }}>
            Built by Possible,<br />
            <em>trusted every day.</em>
          </h2>
          <p className="products-intro">
            Beyond technology consulting, we build and operate brands people rely on every day—delivery, cleaning, and parking solutions across Addis Ababa.
          </p>
        </div>

        <div className="products-list">
          {productItems.map((item, i) => (
            <article
              key={item.id}
              className={`product-row culture-row${i % 2 === 1 ? " product-row--reverse" : ""}`}
            >
              <div className="culture-text product-text">
                <div className="product-meta">
                  <span className="culture-num">{item.num}</span>
                  <div className="section-tag product-tag">{item.tag}</div>
                </div>
                <p className="product-brand">{item.brand}</p>
                {item.phone && (
                  <div className="product-phone-block">
                    <span className="product-phone-label">Order line</span>
                    <a href={`tel:${item.phone}`} className="product-phone">
                      <Ico name="phone" size={18} strokeWidth={2} />
                      {item.phone}
                    </a>
                  </div>
                )}
                <h3 className="product-title">{item.title}</h3>
                <p className="product-body">{item.body}</p>
                <a
                  href={item.phone ? `tel:${item.phone}` : "#contact"}
                  className="btn-primary product-cta"
                >
                  {item.cta || "Get a quote"} <Ico name="arrowRight" size={14} />
                </a>
              </div>
              <div className="culture-image product-image">
                <div className="product-image-frame product-image-frame--brand">
                  <img
                    src={item.logo}
                    alt={item.brand}
                    className="product-brand-logo"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
