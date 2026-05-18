import ICONS from "@/constant/icons";

/* ================= Tabs ================= */
export const TABS = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Database", value: "database" },
  { label: "DevOps & Cloud", value: "devops" },
  { label: "Monitoring", value: "monitoring" },
] as const;

export type SkillCategory = (typeof TABS)[number]["value"];

/* ================= Skill Interface ================= */
export interface Skill {
  id: number;
  name: string;
  side: string;
  logo: string;
  category: Exclude<SkillCategory, "all">;
}

/* ================= Skills Data ================= */
// Using Simple Icons (https://simpleicons.org/) for better reliability and crisp SVGs
// Adding .svg extension and using colored variants where appropriate
const skills: Skill[] = [
  /* ===== High Priority (Requested for "All") ===== */
  {
    id: 1,
    name: "JavaScript",
    side: "Language",
    logo: "https://cdn.simpleicons.org/javascript/F7DF1E",
    category: "frontend",
  },
  {
    id: 2,
    name: "TypeScript",
    side: "Language",
    logo: "https://cdn.simpleicons.org/typescript/3178C6",
    category: "frontend",
  },
  {
    id: 3,
    name: "React",
    side: "Library",
    logo: "https://cdn.simpleicons.org/react/61DAFB",
    category: "frontend",
  },
  {
    id: 4,
    name: "Next.js",
    side: "Framework",
    logo: "https://cdn.simpleicons.org/nextdotjs/white",
    category: "frontend",
  },
  {
    id: 12,
    name: "Express.js",
    side: "Framework",
    logo: "https://cdn.simpleicons.org/express/white",
    category: "backend",
  },
  {
    id: 13,
    name: "NestJS",
    side: "Framework",
    logo: "https://cdn.simpleicons.org/nestjs/E0234E",
    category: "backend",
  },
  {
    id: 17,
    name: "PostgreSQL",
    side: "Database",
    logo: "https://cdn.simpleicons.org/postgresql/4169E1",
    category: "database",
  },
  {
    id: 18,
    name: "Prisma",
    side: "ORM",
    logo: "https://cdn.simpleicons.org/prisma/white",
    category: "database",
  },
  {
    id: 24,
    name: "AWS",
    side: "Cloud",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg",
    category: "devops",
  },
  {
    id: 26,
    name: "Nginx",
    side: "Web Server",
    logo: "https://cdn.simpleicons.org/nginx/009639",
    category: "devops",
  },
  {
    id: 21,
    name: "Docker",
    side: "Containers",
    logo: "https://cdn.simpleicons.org/docker/2496ED",
    category: "devops",
  },
  {
    id: 27,
    name: "Linux",
    side: "OS",
    logo: "https://cdn.simpleicons.org/linux/white",
    category: "devops",
  },

  /* ===== Other Frontend ===== */
  {
    id: 9,
    name: "Redux",
    side: "State Mgmt",
    logo: "https://cdn.simpleicons.org/redux/764ABC",
    category: "frontend",
  },
  {
    id: 10,
    name: "TanStack Query",
    side: "Data Fetching",
    logo: "https://cdn.simpleicons.org/reactquery/FF4154",
    category: "frontend",
  },
  {
    id: 7,
    name: "Tailwind CSS",
    side: "Styling",
    logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    category: "frontend",
  },

  /* ===== Other Backend & DB ===== */
  {
    id: 11,
    name: "Node.js",
    side: "Runtime",
    logo: "https://cdn.simpleicons.org/nodedotjs/339933",
    category: "backend",
  },
  {
    id: 16,
    name: "MongoDB",
    side: "NoSQL DB",
    logo: "https://cdn.simpleicons.org/mongodb/47A248",
    category: "database",
  },
  {
    id: 19,
    name: "DynamoDB",
    side: "Cloud NoSQL",
    logo: "https://cdn.simpleicons.org/amazondynamodb/4053D6",
    category: "database",
  },

  /* ===== Other DevOps & Tools ===== */
  {
    id: 22,
    name: "GitHub Actions",
    side: "Automation",
    logo: "https://cdn.simpleicons.org/githubactions/2088FF",
    category: "devops",
  },
  {
    id: 25,
    name: "AWS EC2",
    side: "Compute",
    logo: "https://cdn.simpleicons.org/amazonec2/FF9900",
    category: "devops",
  },
  {
    id: 20,
    name: "Git",
    side: "VCS",
    logo: "https://cdn.simpleicons.org/git/F05032",
    category: "devops",
  },

  /* ===== Monitoring ===== */
  {
    id: 28,
    name: "Grafana",
    side: "Viz",
    logo: "https://cdn.simpleicons.org/grafana/F46800",
    category: "monitoring",
  },
  {
    id: 29,
    name: "Prometheus",
    side: "Metrics",
    logo: "https://cdn.simpleicons.org/prometheus/E6522C",
    category: "monitoring",
  },
  {
    id: 30,
    name: "Loki",
    side: "Logs",
    logo: "https://cdn.simpleicons.org/grafanaloki/white",
    category: "monitoring",
  },
];

export default skills;
