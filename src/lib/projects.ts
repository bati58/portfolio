export type ProjectKind = "software" | "design";

export type PortfolioProject = {
  slug: string;
  title: string;
  kind: ProjectKind;
  description: string;
  technologies: string[];
  cover: string;
  gallery: { src: string; alt: string; caption: string }[];
  bullets: string[];
  github?: string;
  live?: string;
  figma?: string;
};

export const projects: PortfolioProject[] = [
  {
    slug: "youtube",
    title: "YouTube Clone",
    kind: "software",
    description: "Pixel-focused YouTube UI clone featuring search, category filters, and a responsive video player layout.",
    technologies: ["HTML", "CSS", "JavaScript"],
    cover: "/youtube.jpg",
    gallery: [
      { src: "/youtube.jpg", alt: "YouTube Clone home screen", caption: "Channel-style grid with hover states, category chips, and quick play layout." },
      { src: "/youtube2.png", alt: "YouTube Clone secondary screen", caption: "Adding videos and thumbnails via YouTube link or local upload." },
    ],
    bullets: ["Responsive layout matching YouTube's design.", "Search and category filtering system."],
    live: "https://bati58.github.io/youtube.com-clone/",
    github: "https://github.com/bati58/youtube.com-clone",
  },
  {
    slug: "fenet",
    title: "Fenet Cafe",
    kind: "software",
    description: "Ordering and reservation platform with admin tools for menu, inventory, and sales tracking.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    cover: "/fenu.jpg",
    gallery: [
      { src: "/fenu.jpg", alt: "Fenet Cafe storefront", caption: "Menu browsing and reservation flow tuned for quick ordering." },
      { src: "/fenet2.jpg", alt: "Fenet Cafe admin dashboard", caption: "A clean environment for ethical sourcing, waste reduction, and care." },
    ],
    bullets: ["Auth-protected admin dashboard for menu and stock.", "Customer-facing ordering and booking flows."],
    github: "https://github.com/bati58/Fenet_Cafe-menu",
  },
  {
    slug: "finance",
    title: "Personal Finance Tracker",
    kind: "software",
    description: "Income and expense tracking with JWT auth and charts powered by MongoDB and Node.",
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB"],
    cover: "/finance.jpg",
    gallery: [
      { src: "/finance.jpg", alt: "Finance tracker dashboard", caption: "Overview of balances, recent transactions, and high-level KPIs." },
      { src: "/finance2.jpg", alt: "Finance tracker reports", caption: "Charts and summaries for monthly trends and category breakdowns." },
    ],
    bullets: ["Secure REST API with protected routes.", "Reports and summaries for monthly trends."],
    live: "https://personal-finance-tracker-virid-nine.vercel.app/",
    github: "https://github.com/bati58/Personal-Finance-Tracker",
  },
  {
    slug: "moviehub",
    title: "MovieHub",
    kind: "software",
    description: "Movie discovery with TMDB integration, filters, watchlists, and trailers.",
    technologies: ["Node.js", "Express", "MongoDB", "TMDB API"],
    cover: "/moviehub.jpg",
    gallery: [
      { src: "/moviehub.jpg", alt: "MovieHub discovery page", caption: "Genre filters, hero cards, and trailer-ready movie details." },
      { src: "/moviehub2.jpg", alt: "MovieHub watchlist", caption: "Saved titles and detail views with trailers and metadata." },
    ],
    bullets: ["Server API with Express and MongoDB.", "Frontend pulls trailers, genres, and pagination."],
    live: "https://moviehub-xpqp.onrender.com",
    github: "https://github.com/bati58/MovieHub",
  },
  {
    slug: "smilecare",
    title: "Smilecare Dental Clinic",
    kind: "software",
    description: "Clinic site with appointment submissions, responsive marketing pages, and CMS-friendly content blocks.",
    technologies: ["React", "Vite", "Express", "MongoDB"],
    cover: "/smilecare.jpg",
    gallery: [
      { src: "/smilecare.jpg", alt: "Smilecare homepage", caption: "Hero, service highlights, and a quick appointment CTA." },
      { src: "/smilecare2.jpg", alt: "Smilecare appointment form", caption: "Booking interface showing fields and confirmation state." },
    ],
    bullets: ["Fast React and Vite frontend.", "API endpoints for appointment handling."],
    github: "https://github.com/bati58/smilecare_dental_clinic.git",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    kind: "software",
    description: "Full checkout flow with JWT auth, cart, and order history backed by a Node and Express API.",
    technologies: ["Node.js", "Express", "MongoDB", "TypeScript"],
    cover: "/ecommerce.jpg",
    gallery: [
      { src: "/ecommerce.jpg", alt: "E-commerce storefront", caption: "Product grid with filters, quick add-to-cart, and responsive cards." },
      { src: "/ecommerce2.jpg", alt: "E-commerce checkout flow", caption: "Cart, payment, and order history screens for the buyer journey." },
    ],
    bullets: ["Secure authentication and profile dashboard.", "Catalog browsing, cart, and checkout pipeline."],
    github: "https://github.com/bati58/e-commerce.git",
  },
  {
    slug: "selam-beauty",
    title: "Selam Beauty Salon",
    kind: "design",
    description: "A salon mobile app UI/UX concept for onboarding, service discovery, stylist selection, and appointment booking.",
    technologies: ["UI/UX", "Figma", "Mobile App", "Appointment Flow"],
    cover: "/selam-beauty/cover.png",
    gallery: [
      { src: "/selam-beauty/welcome-screen.png", alt: "Selam Beauty Salon welcome screen", caption: "Opening visual that sets the salon mood." },
      { src: "/selam-beauty/home.png", alt: "Selam Beauty Salon home screen", caption: "Personalized landing screen with booking CTA and service shortcuts." },
      { src: "/selam-beauty/login.png", alt: "Selam Beauty Salon sign-in screen", caption: "Simple login flow with clear fields and alternate sign-in." },
      { src: "/selam-beauty/hair-services.png", alt: "Selam Beauty Salon hair services", caption: "Category-based browsing with pricing and duration." },
      { src: "/selam-beauty/facial-services.png", alt: "Selam Beauty Salon facial services", caption: "Service cards focused on visual appeal and scanability." },
      { src: "/selam-beauty/stylists-list.png", alt: "Selam Beauty Salon stylist list", caption: "Stylist list with roles, ratings, and experience." },
      { src: "/selam-beauty/stylists-selected.png", alt: "Selam Beauty Salon selected stylist", caption: "Multi-step appointment flow showing booking progress." },
      { src: "/selam-beauty/profile.png", alt: "Selam Beauty Salon profile", caption: "Account overview for personal information and preferences." },
    ],
    bullets: ["Designed for fast service discovery and low-friction booking.", "Balances soft salon branding with task-focused mobile navigation.", "Covers authentication, home, categories, stylist selection, and profile screens."],
    github: "https://github.com/bati58/FUTURE_UX_02.git",
    live: "https://www.figma.com/proto/5fjbbL4WlkSVPK80NESaGw/Selam-Beauty-Salon-%E2%80%93-Appointment-App?node-id=20-788&p=f&t=e4ALa6m5ujRWhRIY-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=20%3A788&show-proto-sidebar=1",
    figma: "https://www.figma.com/design/5fjbbL4WlkSVPK80NESaGw/Selam-Beauty-Salon-%E2%80%93-Appointment-App?node-id=0-1&t=y9P4MYADRZo0nwgY-1",
  },
  {
    slug: "smile-speciality",
    title: "Smile Speciality Dental Clinic",
    kind: "design",
    description: "A dental clinic website UI/UX concept focused on trust, service clarity, and a guided path to appointment booking.",
    technologies: ["UI/UX", "Figma", "Healthcare Website", "Appointment UX"],
    cover: "/smile-speciality/cover.png",
    gallery: [
      { src: "/smile-speciality/services.png", alt: "Smile Speciality services page", caption: "Organized treatment categories and specialist highlights." },
      { src: "/smile-speciality/about.png", alt: "Smile Speciality about page", caption: "Trust-building clinic story and reasons for choosing the practice." },
      { src: "/smile-speciality/contact.png", alt: "Smile Speciality contact page", caption: "Contact experience with emergency access, map, and appointment action." },
      { src: "/smile-speciality/appointment.png", alt: "Smile Speciality appointment page", caption: "Structured booking flow with patient details, date, and time slot." },
    ],
    bullets: ["Designed to make medical information trustworthy and easy to navigate.", "Covers homepage, services, about, contact, and appointment screens.", "Balances professionalism with approachable layout and clear calls to action."],
    github: "https://github.com/bati58/FUTURE_UX_01.git",
    live: "https://www.figma.com/proto/0c3LIejO7HvxuwmDpNvWwL/smile-specility-dental-clinic?node-id=1-966&p=f&t=9qFvKFb1lOWrChKv-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A966",
    figma: "https://www.figma.com/design/0c3LIejO7HvxuwmDpNvWwL/smile-specility-dental-clinic?node-id=0-1&t=9qFvKFb1lOWrChKv-1",
  },
];

export const softwareProjects = projects.filter((project) => project.kind === "software");
export const designProjects = projects.filter((project) => project.kind === "design");
