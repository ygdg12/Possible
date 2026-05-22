export const PHONE_MAIN = "+251946565344";
export const PHONE_MAIN_DISPLAY = "+251 94 656 5344";
export const PHONE_BM = "6409";
export const EMAIL = "bereketmitiku79@gmail.com";
export const MAPS_URL = "https://maps.app.goo.gl/G7anSgeF1uPAQ3hS6";

export const OFFICE_LOCATION = {
  title: "Yobek Commercial Center",
  address: "Sengatera · Addis Ababa",
};

export const serviceOptions = [
  "Cloud Services",
  "Cyber Security",
  "IT Consulting",
  "Web Development",
  "Data Analytics",
  "IT Support",
  "BM Delivery",
  "Possible Cleaning Services",
  "Gelagle Park",
];

export const services = [
  {
    icon: "sparkles",
    title: "AI Agent",
    desc: "We have an AI agent built for your business needs. Automate repetitive tasks, answer customer questions instantly, and let intelligent automation work for you around the clock — no extra headcount required.",
  },
  {
    icon: "shield",
    title: "Cyber Security",
    desc: "Protect your business from evolving threats. Continuous monitoring, audits, and enterprise-grade data protection.",
  },
  {
    icon: "briefcase",
    title: "IT Consulting",
    desc: "Expert guidance on technology decisions. We help you plan, invest, and execute the right digital strategy.",
  },
  {
    icon: "code",
    title: "Web & App Development",
    desc: "Build modern websites and applications that look great and perform flawlessly across all devices.",
    stack: ["React", "TypeScript", "Python"],
  },
  {
    icon: "barChart",
    title: "Data Analytics",
    desc: "Turn raw data into actionable insights. Smarter decisions through clear reports and real-time dashboards.",
  },
  {
    icon: "globe",
    title: "Cloud Services",
    desc: "Move your business to the cloud. Access your data anywhere, scale instantly, and reduce infrastructure costs.",
  },
];

export const productItems = [
  {
    id: "bm-delivery",
    num: "01",
    tag: "Logistics & delivery",
    brand: "BM Delivery",
    title: "Fast courier service across Addis Ababa.",
    body: "BM Delivery handles parcels, documents, and business shipments with reliable routes and friendly riders. Same-day options, clear pricing, and support you can reach when it matters.",
    logo: "/products/bm-delivery.png",
    phone: PHONE_BM,
    cta: "Call to order",
  },
  {
    id: "possible-cleaning",
    num: "02",
    tag: "Cleaning & janitorial",
    brand: "Possible Cleaning Services",
    title: "Professional cleaning for every space.",
    body: "Possible Cleaning & Janitorial Service delivers spotless offices, retail floors, and homes with trained crews, quality supplies, and schedules built around your hours.",
    logo: "/products/possible-cleaning.png",
    cta: "Request a visit",
  },
  {
    id: "gelagle-park",
    num: "03",
    tag: "Parking & mobility",
    brand: "Gelagle Park",
    title: "Smart parking, simplified.",
    body: "Gelagle Park makes finding and managing parking straightforward whether you need a secure spot for the day or a dependable solution for your building and guests.",
    logo: "/products/gelagle-park.png",
    cta: "Learn more",
  },
];

export const heroStats = [
  { target: 100, suffix: "%", label: "Built in Ethiopia", icon: "mapPin" },
  { target: 20, suffix: "+", label: "Engineers & Creators", icon: "users" },
  { symbol: "∞", label: "Curiosity Welcome", icon: "infinity" },
];

export const teamMembers = [
  {
    num: "01",
    tag: "Founder & Chief Architect",
    name: "Yared Solomon",
    bio: "Passionate technologist with over 15 years of industry experience. Driving the core engineering culture and technology vision at Possible Technology.",
    bullets: [
      "Enterprise Cloud Architecture expert",
      "Pioneer of value-driven AI automation systems",
      "Dedicated to growing Ethiopia's tech ecosystem"
    ],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/yared-solomon",
      twitter: "https://twitter.com/yared_solomon",
      email: "mailto:yared@possibletechplc.com"
    }
  },
  {
    num: "02",
    tag: "Chief Executive Officer",
    name: "Haileab Solomon",
    bio: "Strategic leader focused on operational excellence, high-impact partnerships, and scale. Guiding our multi-disciplinary teams to deliver world-class products.",
    bullets: [
      "Expert in operational strategy & client relations",
      "Driven by human-centric business innovation",
      "Committed to building high-performing, diverse teams"
    ],
    img: "/haileab.png",
    socials: {
      linkedin: "https://linkedin.com/in/haileab",
      twitter: "https://twitter.com/haileab",
      email: "mailto:haileab@possibletechplc.com"
    }
  },
  {
    num: "03",
    tag: "Senior Full Stack Dev & Team Lead",
    name: "Abel Ashine",
    bio: "Accomplished full-stack developer and technical lead with a track record of architecting scalable web ecosystems. Orchestrating engineering execution across front-end and back-end divisions.",
    bullets: [
      "Expert in React, Node.js, and distributed system design",
      "Pioneer of Agile frameworks and deployment pipelines",
      "Dedicated to technical excellence and code quality"
    ],
    img: "/abel.jpg",
    imgPosition: "center 30%",
    socials: {
      linkedin: "https://linkedin.com/in/abel",
      github: "https://github.com/abel",
      email: "mailto:abel@possibletechplc.com"
    }
  },
  {
    num: "04",
    tag: "Senior Mobile Engineer",
    name: "Yemeserach Tadesse",
    bio: "Mobile systems pioneer specializing in premium iOS and Android platforms. Expert at building fluid cross-platform environments and high-performance apps.",
    bullets: [
      "Expert in React Native, Flutter, and native codebases",
      "Obsessed with 60fps micro-animations and layouts",
      "Leader of our core mobile engineering sprints"
    ],
    img: "/yemeserach.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/yemeserach",
      github: "https://github.com/yemeserach",
      email: "mailto:yemeserach@possibletechplc.com"
    }
  },
  {
    num: "05",
    tag: "UI/UX Designer",
    name: "Robera Abera",
    bio: "Crafting beautiful, intuitive digital experiences with a human-centric approach. Translating complex business workflows into elegant, fluid user interfaces.",
    bullets: [
      "Expert in interactive prototyping and visual design systems",
      "Strong advocate for user empathy and accessibility standards",
      "Leading our product design and user research initiatives"
    ],
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/ruth-abera",
      twitter: "https://twitter.com/ruth_abera",
      email: "mailto:ruth@possibletechplc.com"
    }
  },
  {
    num: "06",
    tag: "DevOps & Cloud Security Specialist",
    name: "Yared Girma",
    bio: "Architecting automated, ultra-secure cloud environments and zero-downtime integration pipelines. Keeping our applications fast, resilient, and highly available.",
    bullets: [
      "Expert in AWS, Kubernetes, and secure infrastructure-as-code",
      "Focused on high availability, security hardening, and performance",
      "Designing robust CI/CD pipelines for all enterprise deployments"
    ],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/elias-takele",
      github: "https://github.com/elias-takele",
      email: "mailto:elias@possibletechplc.com"
    }
  },
  {
    num: "07",
    tag: "Lead AI & Data Engineer",
    name: "Mekdelawit",
    bio: "Specializing in training machine learning models and developing natural language processing agents. Infusing intelligence and automated decision-making into core products.",
    bullets: [
      "Expert in Python, TensorFlow, and advanced NLP frameworks",
      "Architect of our intelligent chatbot and custom search agents",
      "Passionate about extracting clean, actionable insights from data"
    ],
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/helena-kassa",
      github: "https://github.com/helena-kassa",
      email: "mailto:helena@possibletechplc.com"
    }
  },
  {
    num: "08",
    tag: "Mobile App Developer",
    name: "Biruk",
    bio: "Architecting high-throughput server backbones and database structures. Specializing in secure API management and scalable data flow.",
    bullets: [
      "Expert in Go, Python, PostgreSQL, and Redis",
      "Focused on microservice orchestration and performance scaling",
      "Pioneer of data-caching and distributed transaction management"
    ],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/dawit-tesfaye",
      github: "https://github.com/dawit-tesfaye",
      email: "mailto:dawit@possibletechplc.com"
    }
  },
  {
    num: "09",
    tag: "Lead QA & Automation Engineer",
    name: "Tigist Ketema",
    bio: "Ensuring top-tier product reliability and performance across all platforms. Designing complex automated testing suites and quality gate protocols.",
    bullets: [
      "Expert in Selenium, Cypress, and performance load testing",
      "Advocate for regression coverage and automated quality controls",
      "Pioneer of quality-assurance integration within CI/CD pipelines"
    ],
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/tigist-ketema",
      github: "https://github.com/tigist-ketema",
      email: "mailto:tigist@possibletechplc.com"
    }
  },
  {
    num: "10",
    tag: "Associate Software Engineer",
    name: "Abel",
    bio: "A focused backend developer working on databases, API performance, and core application logic. Bringing fresh energy and clean code practices to our dev team.",
    bullets: [
      "Specialist in database modeling & optimization",
      "Proficient in Node.js and Express services",
      "Passionate about automated unit testing"
    ],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/abel-junior",
      email: "mailto:abel@possibletechplc.com"
    }
  },
  {
    num: "11",
    tag: "Front-end Developer",
    name: "Mamo",
    bio: "Enthusiastic front-end developer building interactive, accessible, and fast user interfaces. Assisting clients with smooth onboarding and product deployments.",
    bullets: [
      "Focused on React components & CSS styling",
      "Expert in cross-browser compatibility debugging",
      "Dedicated to client satisfaction and support"
    ],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://linkedin.com/in/mamo-dev",
      email: "mailto:mamo@possibletechplc.com"
    }
  }
];

