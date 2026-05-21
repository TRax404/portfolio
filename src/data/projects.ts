import LINKS from "@/constant/links";

export type ProjectContentBlock =
  | { type: "paragraph"; body: string }
  | { type: "heading"; body: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; body: string }
  | { type: "quote"; body: string };

export interface Project {
  id: number;
  slug: string;
  project_name: string;
  description: string;
  project_thumnail: string;
  technology: string[];
  live_link?: string;
  video_url?: string;
  client_github_link?: string;
  server_github_link?: string;
  blog_link?: string;
  company?: {
    name: string;
    url: string;
  };
  contributors?: {
    name: string;
    fb: string;
  }[];
  content: ProjectContentBlock[];
  createdAt: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: "mockuphive",
    project_name: "MockupHive | OlynexLLC",
    description:
      "MockupHive is a premium platform by OlynexLLC where users can download professional mockup files for Photoshop. It features an innovative online editor for browser-based customization, along with dedicated plugins for Figma and Adobe tools. The platform includes a robust admin dashboard for comprehensive management.",
    project_thumnail: LINKS.mockuphive_thumnail,
    technology: [
      "Next.js",
      "TypeScript",
      "Tailwindcss",
      "Framer Motion",
      "Shadcn/ui",
      "NodeJS",
      "ExpressJS",
      "Mongoose",
      "NextAuth",
      "Figma API",
      "Adobe API",
      "JWT",
      "Stripe",
    ],
    live_link: LINKS.mockuphive_live,
    video_url: LINKS.mockuphive_video,
    company: {
      name: "OlynexLLC",
      url: LINKS.olynex,
    },
    blog_link: "/blogs/mockuphive-case-study",
    createdAt: "2024-01-15",
    content: [
      { type: "heading", body: "The Vision" },
      { type: "paragraph", body: "MockupHive was conceived as a one-stop solution for designers who need high-quality, easily customizable mockups. The goal was to bridge the gap between static PSD files and instant web-based customization." },
      { type: "heading", body: "Core Infrastructure" },
      { type: "list", items: ["Advanced Canvas-based Online Editor for real-time mockup editing.", "Secure Asset Delivery system with automated watermarking.", "Multi-platform integration with Figma and Adobe Creative Cloud.", "Subscription-based access model powered by Stripe."] },
      { type: "quote", body: "Building a browser-based PSD renderer was our biggest challenge and greatest achievement." },
      { type: "heading", body: "Technical Implementation" },
      { type: "code", language: "ts", body: "// Example of our mockup processing logic\nconst processMockup = async (canvasData: any) => {\n  const renderer = new MockupRenderer(canvasData);\n  return await renderer.generateExport('png', { quality: 1.0 });\n};" }
    ]
  },
  {
    id: 2,
    slug: "iconiex",
    project_name: "Iconiex | OlynexLLC",
    description:
      "Iconiex is an extensive icon ecosystem by OlynexLLC, featuring Adobe and Figma plugins. Users can seamlessly download and integrate high-quality icons into their designs, as well as contribute to the growing library. Built for professional designers and developers.",
    project_thumnail: LINKS.iconiex_thumnail,
    technology: [
      "Next.js",
      "TypeScript",
      "Tailwindcss",
      "Prime React",
      "Node.js",
      "ExpressJS",
      "Mongoose",
      "Figma API",
      "JWT",
      "Stripe",
      "Firebase",
    ],
    live_link: LINKS.iconiex,
    video_url: LINKS.iconiex_video,
    company: {
      name: "OlynexLLC",
      url: LINKS.olynex,
    },
    blog_link: "/blogs/iconiex-development",
    createdAt: "2024-02-20",
    content: [
      { type: "heading", body: "Ecosystem Overview" },
      { type: "paragraph", body: "Iconiex isn't just a library; it's a full ecosystem. We focused on making icons accessible exactly where designers work - inside Figma and Adobe tools." },
      { type: "heading", body: "Key Features" },
      { type: "list", items: ["SVG optimization pipeline for lightning-fast loads.", "Custom Figma plugin with drag-and-drop support.", "Dynamic icon recoloring engine.", "Contributor dashboard for community growth."] },
      { type: "code", language: "ts", body: "// SVG Optimization Logic\nexport const optimizeSVG = (rawSvg: string) => {\n  return svgo.optimize(rawSvg, { \n    plugins: ['preset-default', 'removeDimensions'] \n  });\n};" }
    ]
  },
  {
    id: 3,
    slug: "drivepulse",
    project_name: "DrivePulse | Team",
    description:
      "A TEAM project, this is a online file sharing website user can upload file and share this file in real-time, impliment a real-time chat function because users can callabration in another users.",
    project_thumnail: LINKS.drivepulse_thumnail,
    technology: ["Next.js", "TypeScript", "Tailwindcss", "Jwt", "Mongoose", "ExpressJs", "Node.js", "socket.io", "Firebase"],
    client_github_link: "https://github.com/Binary-Masters/DrivePulse-Client",
    server_github_link: "https://github.com/Binary-Masters/DrivePulse-Server",
    live_link: LINKS.drivepulse,
    video_url: LINKS.drivepulse_video,
    contributors: [
      {
        name: "Shahidul Islam",
        fb: "https://www.facebook.com/profile.php?id=100007891637711",
      },
      {
        name: "Md. Morshed Alam",
        fb: "https://www.facebook.com/mdmorsed.alam.9809",
      },
      {
        name: "Zaib Khan",
        fb: "https://www.facebook.com/scarcrack",
      },
      {
        name: "Kamruj Jaman",
        fb: "https://www.facebook.com/kj.rahil",
      },
      {
        name: "Abu Bokor Siddiq",
        fb: "https://www.facebook.com/profile.php?id=100024960182776",
      },
    ],
    createdAt: "2023-11-05",
    content: [
      { type: "heading", body: "Collaboration at its Core" },
      { type: "paragraph", body: "DrivePulse was built to solve the friction in team-based file sharing. We combined fast storage with real-time communication." },
      { type: "heading", body: "Architecture" },
      { type: "list", items: ["Socket.io for real-time chat and upload progress.", "Firebase Storage for robust file management.", "Express.js backend with JWT authentication.", "Responsive Next.js frontend."] }
    ]
  },
  {
    id: 4,
    slug: "nexglab",
    project_name: "NexgLab",
    description:
      "NexgLab is my personal blog website where I share my experiences, thoughts, and learnings. I built it to have a clean and simple space to showcase my personal journey, projects, and insights. The platform is designed with a modern interface, making it easy for me to manage and present my content.",
    project_thumnail: LINKS.nexg_lab_thumnail,
    technology: ["Next.js", "TypeScript", "Tailwindcss", "BetterAuth", "PostgreSQL", "Prisma", "NeonDB", "Shadcn/ui"],
    client_github_link: LINKS.nexg_github,
    live_link: LINKS.nexg_lab,
    video_url: LINKS.nexg_lab_video,
    createdAt: "2024-03-10",
    content: [
      { type: "heading", body: "Personal Identity" },
      { type: "paragraph", body: "NexgLab serves as my digital garden. It's where I document my technical journey and share insights with the community." },
      { type: "heading", body: "Modern Stack" },
      { type: "list", items: ["PostgreSQL with NeonDB for serverless database scaling.", "Prisma ORM for type-safe database access.", "BetterAuth for secure and modern authentication flow.", "Tailwind CSS for sleek, minimalist design."] }
    ]
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectById = (id: string | number) => projects.find((p) => String(p.id) === String(id));

export default projects;
