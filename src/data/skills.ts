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
const skills: Skill[] = [
  /* ===== Frontend ===== */
  {
    id: 1,
    name: "JavaScript",
    side: "Language",
    logo: ICONS.javascript,
    category: "frontend",
  },
  {
    id: 2,
    name: "TypeScript",
    side: "Language",
    logo: ICONS.typescript,
    category: "frontend",
  },
  {
    id: 3,
    name: "React",
    side: "Library",
    logo: ICONS.react,
    category: "frontend",
  },
  {
    id: 4,
    name: "Next.js",
    side: "Framework",
    logo: ICONS.nextjs,
    category: "frontend",
  },
  {
    id: 9,
    name: "Redux",
    side: "State Mgmt",
    logo: ICONS.redux,
    category: "frontend",
  },
  {
    id: 10,
    name: "TanStack Query",
    side: "Data Fetching",
    logo: "https://cdn.simpleicons.org/reactquery",
    category: "frontend",
  },

  /* ===== Backend ===== */
  {
    id: 11,
    name: "Node.js",
    side: "Runtime",
    logo: ICONS.nodejs,
    category: "backend",
  },
  {
    id: 12,
    name: "Express.js",
    side: "Framework",
    logo: ICONS.express,
    category: "backend",
  },
  {
    id: 13,
    name: "NestJS",
    side: "Framework",
    logo: "https://cdn.simpleicons.org/nestjs",
    category: "backend",
  },

  /* ===== Database ===== */
  {
    id: 16,
    name: "MongoDB",
    side: "NoSQL DB",
    logo: ICONS.mongodb,
    category: "database",
  },
  {
    id: 17,
    name: "PostgreSQL",
    side: "Relational DB",
    logo: ICONS.postgresql,
    category: "database",
  },
  {
    id: 18,
    name: "Prisma ORM",
    side: "Database ORM",
    logo: ICONS.prisma,
    category: "database",
  },
  {
    id: 19,
    name: "DynamoDB",
    side: "Cloud NoSQL",
    logo: "https://cdn.simpleicons.org/amazondynamodb",
    category: "database",
  },
  {
    id: 20,
    name: "SQL",
    side: "Language",
    logo: "https://cdn.simpleicons.org/sqlite",
    category: "database",
  },

  /* ===== DevOps & Cloud ===== */
  {
    id: 21,
    name: "Docker",
    side: "Containerization",
    logo: "https://cdn.simpleicons.org/docker",
    category: "devops",
  },
  {
    id: 22,
    name: "CI/CD",
    side: "Automation",
    logo: "https://cdn.simpleicons.org/githubactions",
    category: "devops",
  },
  {
    id: 23,
    name: "GitHub Actions",
    side: "Workflow",
    logo: "https://cdn.simpleicons.org/githubactions",
    category: "devops",
  },
  {
    id: 24,
    name: "AWS",
    side: "Cloud Platform",
    logo: ICONS.aws,
    category: "devops",
  },
  {
    id: 25,
    name: "AWS EC2",
    side: "Cloud Compute",
    logo: "https://cdn.simpleicons.org/amazonec2",
    category: "devops",
  },
  {
    id: 26,
    name: "Nginx",
    side: "Web Server",
    logo: "https://cdn.simpleicons.org/nginx",
    category: "devops",
  },
  {
    id: 27,
    name: "Linux Server",
    side: "OS",
    logo: "https://cdn.simpleicons.org/linux",
    category: "devops",
  },

  /* ===== Monitoring ===== */
  {
    id: 28,
    name: "Grafana",
    side: "Visualization",
    logo: "https://cdn.simpleicons.org/grafana",
    category: "monitoring",
  },
  {
    id: 29,
    name: "Prometheus",
    side: "Monitoring",
    logo: "https://cdn.simpleicons.org/prometheus",
    category: "monitoring",
  },
  {
    id: 30,
    name: "Loki",
    side: "Logging",
    logo: "https://cdn.simpleicons.org/grafanaloki",
    category: "monitoring",
  },
];

export default skills;

