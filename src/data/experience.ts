import { TExperience } from "@/types/experienceTypes";

const EXPERIENCE: TExperience[] = [
  {
    id: "exp-2",
    role: "Full Stack Engineer (Backend Focused)",
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
      "Socket.io"
    ],
    highlights: [
      "Successfully managed and executed end-to-end deployments for multiple production-grade web applications, mastering multi-server configurations and custom infrastructure setup.",
      "Architected scalable backend microservices and RESTful APIs, driving a noticeable reduction in server-side response latency through strategic indexing and caching.",
      "Streamlined deployment workflows by implementing automated CI/CD pipelines via GitHub Actions, containerizing environments with Docker, and configuring Nginx/Caddy reverse proxies.",
      "Engineered real-time features using Socket.io and integrated complex cloud services, including AWS Rekognition for AI-driven image processing and secure S3 storage layers.",
      "Collaborated closely with cross-functional teams to refactor legacy codebases, resolving critical performance bottlenecks and enhancing overall system maintainability."
    ],
  },
  {
    id: "exp-1",
    role: "Backend Developer",
    company: "Softvence Agency",
    location: "On-site · Dhaka, Bangladesh",
    period: "Nov 2025 – Jan 2026",
    tech: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Docker",
      "WebSockets"
    ],
    website: "",
    highlights: [
      "Spearheaded a rapid structural transition from frontend operations into core backend architecture within a tight release cycle, taking immediate ownership of database design.",
      "Developed, optimized, and maintained high-throughput web applications using Node.js and MongoDB, enforcing strict TypeScript type-safety across the stack.",
      "Implemented critical system performance optimizations and schema indexing strategies that significantly improved API payload delivery and application load speeds.",
      "Built resilient real-time communication modules utilizing WebSockets to handle concurrent user state synchronization seamlessly."
    ],
  },
];

export default EXPERIENCE;