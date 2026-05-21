import { Link } from "react-router-dom";

const portfolioProjects = [
  {
    id: "bm-delivery",
    num: "01",
    tag: "Logistics & Delivery",
    title: "BM Delivery",
    subtitle: "Fast courier service across Addis Ababa.",
    body: "BM Delivery handles parcels, documents, and business shipments with reliable routes and friendly riders. Same-day options, clear pricing, and support you can reach when it matters.",
    highlights: [
      "Same-day delivery within Addis Ababa",
      "Real-time parcel tracking",
      "Dedicated business accounts",
      "Fleet of trained riders",
    ],
    logo: "/products/bm-delivery.png",
    link: "tel:6409",
    linkLabel: "Call to order",
  },
  {
    id: "possible-cleaning",
    num: "02",
    tag: "Cleaning & Janitorial",
    title: "Possible Cleaning Services",
    subtitle: "Professional cleaning for every space.",
    body: "Possible Cleaning & Janitorial Service delivers spotless offices, retail floors, and homes with trained crews, quality supplies, and schedules built around your hours.",
    highlights: [
      "Office & commercial cleaning",
      "Residential deep cleaning",
      "Post-construction cleanup",
      "Eco-friendly products available",
    ],
    logo: "/products/possible-cleaning.png",
    link: "#contact",
    linkLabel: "Request a visit",
  },
  {
    id: "gelagle-park",
    num: "03",
    tag: "Parking & Mobility",
    title: "Gelagle Park",
    subtitle: "Smart parking, simplified.",
    body: "Gelagle Park makes finding and managing parking straightforward whether you need a secure spot for the day or a dependable solution for your building and guests.",
    highlights: [
      "Secure monitored parking lots",
      "Monthly & daily passes",
      "Valet services available",
      "Event parking solutions",
    ],
    logo: "/products/gelagle-park.png",
    link: "#contact",
    linkLabel: "Learn more",
  },
  {
    id: "possible-fleet",
    num: "04",
    tag: "IoT & Logistics",
    title: "Possible Fleet",
    subtitle: "RFID Integrated Fleet Management System.",
    body: "A system that uses RFID technology to track, monitor, and manage vehicles automatically in real time, streamlining fleet operations and security.",
    highlights: [
      "Real-time vehicle tracking & history",
      "RFID automated gate authorization",
      "Tamper-proof vehicle tag integration",
      "Telematics & speeding alerts",
    ],
    logo: "/logo-mark.png",
    link: "#contact",
    linkLabel: "Get Started",
  },
  {
    id: "possible-nfc",
    num: "05",
    tag: "Security & Operations",
    title: "Possible NFC",
    subtitle: "NFC Chip Integrated System.",
    body: "A system that uses NFC chips for secure short-range communication like contactless payments, attendance logging, and automated access control.",
    highlights: [
      "Contactless micro-payment systems",
      "Instant attendance & time tracking",
      "Secure encrypted NFC keys & badges",
      "Offline authentication support",
    ],
    logo: "/logo-mark.png",
    link: "#contact",
    linkLabel: "Learn more",
  },
  {
    id: "possible-ai",
    num: "06",
    tag: "Artificial Intelligence",
    title: "Possible AI",
    subtitle: "AI Agents for Hospitals and Schools.",
    body: "Intelligent software assistants that automate tasks, answer administrative questions, and streamline operational management in hospitals and academic institutions.",
    highlights: [
      "Automated student & patient query handling",
      "Smart scheduling & appointment booking",
      "Document processing & indexing",
      "Multi-channel support & notifications",
    ],
    logo: "/logo-mark.png",
    link: "#contact",
    linkLabel: "Explore Solutions",
  },
];

const Ico = ({ d, size = 18, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  check: "M20 6L9 17l-5-5",
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  externalLink: ["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", "M15 3h6v6", "M10 14L21 3"],
  truck: ["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", "M15 18H9", "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14", "M14 18v-3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3", "M14 9V7"],
  sparkles: ["M12 3l1.2 3.6L17 7.8l-3.6 1.2L12 12.6 10.6 9l-3.6-1.2L10.8 6.6 12 3z", "M5 14l.8 2.4L8 17.2l-2.4.8L5 20.4 3.6 18l-2.4-.8L3.2 16.4 5 14z", "M19 14l.8 2.4L22 17.2l-2.4.8L19 20.4l-1.4-2.4-2.4-.8 2.4-.8 1.4-2.4z"],
  mapPin: ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
};

export default function PortfolioPage({ dark }) {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="section-wrap">
          <Link to="/" className="portfolio-back-link">
            <Ico d={icons.arrowLeft} size={14} />
            Back to Home
          </Link>
          <div className="section-tag">Our Portfolio</div>
          <h1 className="display-heading" style={{ marginTop: 16 }}>
            Projects we've<br /><em>brought to life.</em>
          </h1>
          <p className="portfolio-intro">
            Every product we build reflects our commitment to quality, reliability, and real-world impact. Here are some of the brands and solutions we operate.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-wrap">
          <div className="portfolio-grid">
            {portfolioProjects.map((project, i) => (
              <article
                key={project.id}
                className={`portfolio-card${i % 2 === 1 ? " portfolio-card--reverse" : ""}`}
              >
                <div className="portfolio-card-image">
                  <div className="portfolio-image-frame">
                    <img
                      src={project.logo}
                      alt={project.title}
                      className="portfolio-logo"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="portfolio-card-content">
                  <div className="portfolio-meta">
                    <span className="culture-num">{project.num}</span>
                    <div className="section-tag">{project.tag}</div>
                  </div>
                  <h2 className="portfolio-card-title">{project.title}</h2>
                  <p className="portfolio-card-subtitle">{project.subtitle}</p>
                  <p className="portfolio-card-body">{project.body}</p>
                  <ul className="portfolio-highlights">
                    {project.highlights.map((h, idx) => (
                      <li key={idx}>
                        <Ico d={icons.check} size={13} strokeWidth={2.5} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.link}
                    className="btn-primary"
                    target={project.link.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {project.linkLabel}
                    <Ico d={icons.arrowRight} size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
