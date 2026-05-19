import { TExperience } from "@/types/experienceTypes";

const EXPERIENCE: TExperience[] = [
  {
    id: "exp-2",
    role: "Full Stack Engineer (Backend Specialist)",
    company: "Softvence Agency",
    location: "On-site · Dhaka, Bangladesh",
    period: "Jan 2026 – Present",
    tech: [
      "NestJS",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Next.js",
      "Docker",
      "GitHub Actions",
      "AWS (EC2, S3, SES, Rekognition)",
      "Nginx",
      "Caddy",
      "Socket.io",
    ],
    keyAchievement: "Successfully architected and deployed 5+ production-grade applications with 99.9% uptime.",
    highlights: [
      "Spearheaded end-to-end architecture and deployment of multiple production-grade web applications, mastering multi-server configurations and custom infrastructure setup.",
      "Reduced API latency by 45% by architecting scalable NestJS microservices with optimized PostgreSQL indexing and Redis caching strategies.",
      "Automated delivery cycles using GitHub Actions and Docker, cutting deployment lead time by 60% and ensuring environment consistency across staging and production.",
      "Engineered real-time features using Socket.io and integrated complex cloud services, including AWS Rekognition for AI-driven image processing and secure S3 storage layers.",
      "Led the refactoring of critical legacy systems, improving code maintainability by 40% and resolving long-standing performance bottlenecks in high-traffic modules.",
    ],
  },
  {
    id: "exp-1",
    role: "Backend Developer",
    company: "Softvence Agency",
    location: "On-site · Dhaka, Bangladesh",
    period: "Nov 2025 – Jan 2026",
    tech: ["Node.js", "Express.js", "TypeScript", "MongoDB", "Mongoose", "Docker", "WebSockets"],
    website: "",
    keyAchievement: "Rapidly promoted to Backend Developer within 3 months due to exceptional performance and architectural contributions.",
    highlights: [
      "Spearheaded a rapid structural transition from frontend operations into core backend architecture within a tight release cycle, taking immediate ownership of database design.",
      "Developed and optimized high-throughput Node.js/Express applications, enforcing strict TypeScript type-safety to eliminate 95% of runtime type errors.",
      "Enhanced database performance by 35% through complex MongoDB aggregation pipeline optimizations and strategic schema indexing.",
      "Built resilient real-time communication modules utilizing WebSockets to handle concurrent user state synchronization seamlessly for thousands of users.",
    ],
  },
];

export default EXPERIENCE;