import { useState, useCallback } from "react";
import { services } from "../data/siteData.js";

const STACK_ICONS = {
  React: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        TS
      </text>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#3776AB" d="M12 2c-3 0-2.8 1.4-2.8 2v2h5.6V5H12c.5 0 1 .2 1 .8v1.6c0 .6-.5 1.2-1 1.2H7.2C5 10.6 4 11.8 4 14v2c0 2.2 1.8 4 4 4h1v-2.8c0-1-.8-1.8-1.8-1.8h-4.4c1.6 0 2.8-1.3 2.8-2.8V8.2C18 5.5 15.5 2 12 2z" />
      <path fill="#FFD43B" d="M20 8v2h-5.6V8H16c-.5 0-1-.2-1-.8V5.6c0-.6.5-1.2 1-1.2h3.8C21 10.4 22 11.2 22 14v2c0 2.2-1.8 4-4 4h-1v-2.8c0-1-.8-1.8-1.8-1.8h-4.4c-1.6 0-2.8-1.3-2.8-2.8V8z" />
    </svg>
  ),
};

export default function ServicesShowcase({ Ico }) {
  const [active, setActive] = useState(null);

  const open = useCallback((index) => setActive(index), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <div className="services-showcase">
      <div className="services-showcase-layout">
        <div className="services-showcase-intro">
          <p className="services-showcase-eyebrow">
            <span className="services-showcase-eyebrow-line" aria-hidden="true" />
            Services
          </p>
          <h2 className="services-showcase-heading">
            Complete technology solutions for your business.
          </h2>
          <p className="services-showcase-lead">
            From cloud infrastructure to round-the-clock support, we design, build, and maintain
            systems that help you grow with clarity and confidence.
          </p>
        </div>

        <div className="services-accordion" role="list">
          {services.map((service, index) => {
            const num = String(index + 1).padStart(2, "0");
            const isActive = active === index;

            return (
              <article
                key={service.title}
                role="listitem"
                className={`services-accordion-item${isActive ? " is-active" : ""}`}
                onMouseEnter={() => open(index)}
                onMouseLeave={close}
              >
                <div className="services-accordion-trigger">
                  <span className="services-accordion-num">{num}</span>
                  <span className="services-accordion-title">
                    {service.title}
                    {service.badge && (
                      <span className="services-accordion-badge">{service.badge}</span>
                    )}
                  </span>
                  <span className="services-accordion-arrow" aria-hidden="true">
                    <Ico name="arrowRight" size={16} strokeWidth={1.5} />
                  </span>
                </div>

                <div className="services-accordion-panel" aria-hidden={!isActive}>
                  <div className="services-accordion-panel-inner">
                    <div className="services-accordion-panel-content">
                      <p className="services-accordion-desc">{service.desc}</p>
                      {service.stack && (
                        <div className="services-accordion-stack" aria-label="Tech stack">
                          {service.stack.map((name) => (
                            <span key={name} className="services-stack-badge">
                              {STACK_ICONS[name]}
                              <span>{name}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      <a href="#contact" className="services-accordion-link">
                        Discuss this service <Ico name="arrowRight" size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
