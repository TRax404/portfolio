export const TECH_CATEGORIES = [
  { label: "All", value: "all", glow: "rgba(148, 163, 184, 0.55)" },
  { label: "Frontend", value: "frontend", glow: "rgba(56, 189, 248, 0.7)" },
  { label: "Backend", value: "backend", glow: "rgba(74, 222, 128, 0.7)" },
  { label: "Database", value: "database", glow: "rgba(168, 85, 247, 0.72)" },
  { label: "DevOps", value: "devops", glow: "rgba(251, 191, 36, 0.72)" },
] as const;

export type TechCategory = Exclude<(typeof TECH_CATEGORIES)[number]["value"], "all">;
export type TechFilter = (typeof TECH_CATEGORIES)[number]["value"];
export type BubbleSize = "sm" | "md" | "lg";

export interface TechStackItem {
  id: string;
  name: string;
  category: TechCategory;
  icon: string;
  glowColor: string;
  color: string;
  size: BubbleSize;
}

export const TECH_STACK: TechStackItem[] = [
  { id: "react", name: "React", category: "frontend", icon: "https://cdn.simpleicons.org/react/61DAFB", glowColor: "rgba(97, 218, 251, 0.78)", color: "#61DAFB", size: "lg" },
  { id: "nextjs", name: "Next.js", category: "frontend", icon: "https://cdn.simpleicons.org/nextdotjs/white", glowColor: "rgba(226, 232, 240, 0.7)", color: "#E2E8F0", size: "lg" },
  { id: "typescript", name: "TypeScript", category: "frontend", icon: "https://cdn.simpleicons.org/typescript/3178C6", glowColor: "rgba(49, 120, 198, 0.76)", color: "#3178C6", size: "md" },
  { id: "javascript", name: "JavaScript", category: "frontend", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", glowColor: "rgba(247, 223, 30, 0.7)", color: "#F7DF1E", size: "md" },
  { id: "redux", name: "Redux", category: "frontend", icon: "https://cdn.simpleicons.org/redux/764ABC", glowColor: "rgba(118, 74, 188, 0.75)", color: "#764ABC", size: "sm" },
  { id: "tanstack-query", name: "TanStack Query", category: "frontend", icon: "https://cdn.simpleicons.org/reactquery/FF4154", glowColor: "rgba(255, 65, 84, 0.68)", color: "#FF4154", size: "md" },
  { id: "nodejs", name: "Node.js", category: "backend", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", glowColor: "rgba(95, 160, 78, 0.76)", color: "#5FA04E", size: "lg" },
  { id: "express", name: "Express.js", category: "backend", icon: "https://cdn.simpleicons.org/express/white", glowColor: "rgba(226, 232, 240, 0.6)", color: "#E2E8F0", size: "md" },
  { id: "nestjs", name: "NestJS", category: "backend", icon: "https://cdn.simpleicons.org/nestjs/E0234E", glowColor: "rgba(224, 35, 78, 0.68)", color: "#E0234E", size: "md" },
  { id: "mongodb", name: "MongoDB", category: "database", icon: "https://cdn.simpleicons.org/mongodb/47A248", glowColor: "rgba(71, 162, 72, 0.74)", color: "#47A248", size: "lg" },
  { id: "postgresql", name: "PostgreSQL", category: "database", icon: "https://cdn.simpleicons.org/postgresql/4169E1", glowColor: "rgba(99, 102, 241, 0.72)", color: "#6366F1", size: "md" },
  { id: "dynamodb", name: "DynamoDB", category: "database", icon: "https://cdn.simpleicons.org/amazondynamodb/4053D6", glowColor: "rgba(129, 140, 248, 0.72)", color: "#818CF8", size: "sm" },
  { id: "docker", name: "Docker", category: "devops", icon: "https://cdn.simpleicons.org/docker/2496ED", glowColor: "rgba(36, 150, 237, 0.72)", color: "#2496ED", size: "lg" },
  { id: "github-actions", name: "GitHub Actions", category: "devops", icon: "https://cdn.simpleicons.org/githubactions/2088FF", glowColor: "rgba(32, 136, 255, 0.68)", color: "#2088FF", size: "md" },
  { id: "aws", name: "AWS", category: "devops", icon: "https://cdn.simpleicons.org/amazonaws/FF9900", glowColor: "rgba(255, 153, 0, 0.78)", color: "#FF9900", size: "lg" },
  { id: "nginx", name: "Nginx", category: "devops", icon: "https://cdn.simpleicons.org/nginx/009639", glowColor: "rgba(0, 150, 57, 0.7)", color: "#009639", size: "sm" },
  { id: "linux", name: "Linux", category: "devops", icon: "https://cdn.simpleicons.org/linux/FCC624", glowColor: "rgba(252, 198, 36, 0.72)", color: "#FCC624", size: "md" },
  { id: "git", name: "Git", category: "devops", icon: "https://cdn.simpleicons.org/git/F05032", glowColor: "rgba(240, 80, 50, 0.7)", color: "#F05032", size: "sm" },
];
