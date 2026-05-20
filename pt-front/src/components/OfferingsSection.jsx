import { useState, useEffect, useCallback } from "react";
import { productItems } from "../data/siteData.js";
import { ProductListSkeleton } from "./Skeleton.jsx";
import ServicesShowcase from "./ServicesShowcase.jsx";

const TAB_LOAD_MS = 380;

export default function OfferingsSection({ Ico, subtleBg }) {
  const [tab, setTab] = useState("services");
  const [loading, setLoading] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const syncHash = useCallback((next) => {
    const hash = next === "products" ? "#products" : "#services";
    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
  }, []);

  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#products") setTab("products");
      else if (window.location.hash === "#services") setTab("services");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const switchTab = (next) => {
    if (next === tab || loading) return;
    setPendingTab(next);
    setLoading(true);
    syncHash(next);
    setTimeout(() => {
      setTab(next);
      setPendingTab(null);
      setLoading(false);
    }, TAB_LOAD_MS);
  };

  const viewTab = pendingTab || tab;

  return (
    <section
      id="services"
      className={`offerings-section${tab === "services" ? " offerings-section--services" : ""}`}
      style={tab === "products" ? { background: subtleBg } : undefined}
    >
      <span id="products" className="section-anchor" aria-hidden="true" />
      <div className="section-wrap">
        {tab === "products" && (
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
        )}

        <div className="offerings-tabs" role="tablist" aria-label="Consulting services and proprietary products">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "services"}
            className={`offerings-tab${tab === "services" ? " is-active" : ""}`}
            onClick={() => switchTab("services")}
          >
            <Ico name="layers" size={16} />
            Consulting Services
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "products"}
            className={`offerings-tab${tab === "products" ? " is-active" : ""}`}
            onClick={() => switchTab("products")}
          >
            <Ico name="truck" size={16} />
            Our Proprietary Products
          </button>
        </div>

        <div className="offerings-panel" role="tabpanel">
          {loading && viewTab === "products" ? (
            <ProductListSkeleton />
          ) : tab === "services" ? (
            <ServicesShowcase Ico={Ico} />
          ) : (
            <div className="products-list">
              {productItems.map((item, i) => (
                <article key={item.id} className={`product-row culture-row${i % 2 === 1 ? " product-row--reverse" : ""}`}>
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
                      <img src={item.logo} alt={item.brand} className="product-brand-logo" loading="lazy" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
