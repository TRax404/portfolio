export type BlogContentBlock =
  | { type: "paragraph"; body: string }
  | { type: "heading"; body: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; body: string }
  | { type: "quote"; body: string };

export type BlogType = "engineering-note" | "case-study";

export interface BlogPost {
  id: number;
  type: BlogType;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  createdAt: string;
  readTime: string;
  previewUrl?: string;
  content: BlogContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 16,
    type: "engineering-note",
    slug: "building-scalable-notification-system-nestjs-bullmq",
    title: "Building a Scalable Notification System with NestJS and Redis BullMQ",
    excerpt: "A deep dive into handling thousands of concurrent notifications using background jobs, queues, and clean provider patterns.",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85",
    tags: ["NestJS", "BullMQ", "Redis", "Architecture"],
    createdAt: "2026-06-14",
    readTime: "12 min read",
    content: [
      { type: "paragraph", body: "Notifications are the heartbeat of modern apps. But sending an email or push notification inside the main request-response cycle is a recipe for disaster. If the third-party provider is slow or down, your whole API hangs. The solution? Decoupling with background queues." },
      { type: "heading", body: "The Architecture" },
      { type: "paragraph", body: "We use BullMQ for its reliability and observability. The flow is simple: the API 'produces' a job to Redis, and a dedicated worker 'consumes' it. This ensures 100% uptime for the user even during high traffic." },
      { type: "code", language: "ts", body: "// Producer: Adding a job to the queue\n@Injectable()\nexport class NotificationService {\n  constructor(@InjectQueue('notifications') private readonly queue: Queue) {}\n\n  async sendWelcomeEmail(userId: string) {\n    await this.queue.add('send-email', { userId, template: 'welcome' }, {\n      attempts: 3,\n      backoff: { type: 'exponential', delay: 1000 },\n    });\n  }\n}" },
      { type: "heading", body: "The Consumer: Resilient Execution" },
      { type: "paragraph", body: "The worker handles the heavy lifting. By wrapping it in a processor, we can handle retries and rate limiting without touching the main business logic." },
      { type: "code", language: "ts", body: "@Processor('notifications')\nexport class NotificationProcessor {\n  @Process('send-email')\n  async handleSendEmail(job: Job) {\n    const { userId, template } = job.data;\n    // Logic to call SendGrid/SES goes here\n    await this.emailProvider.send(userId, template);\n  }\n}" },
      { type: "list", items: ["Exponential backoff for failed deliveries.", "Concurrency control to prevent overloading mail servers.", "Sandboxed processors for CPU-intensive tasks.", "Deduplication to prevent sending the same alert twice."] },
      { type: "quote", body: "Don't let your API wait for things it doesn't own. Queue it, forget it, and let the worker handle the failures." },
    ],
  },
  {
    id: 15,
    type: "engineering-note",
    slug: "node-js-vs-the-world-nestjs-production-standard",
    title: "Node.js vs. The World: Why NestJS is my Production Standard in 2026",
    excerpt: "An opinionated take on why I still bet on Node.js and NestJS despite the rise of new runtimes and frameworks.",
    coverImage: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=1400&q=85",
    tags: ["Node.js", "NestJS", "Opinion", "Backend"],
    createdAt: "2026-06-12",
    readTime: "9 min read",
    content: [
      { type: "paragraph", body: "Every few months, a new runtime or 'revolutionary' framework claims to be the Node-killer. We've seen Deno, Bun, and dozens of others. While competition is great, my production bet remains firmly on Node.js—specifically paired with NestJS. Here's why I think this stack has reached a level of maturity that others are still chasing." },
      { type: "heading", body: "The Ecosystem Advantage" },
      { type: "paragraph", body: "It's not just about speed. It's about the million-plus packages on NPM that solve every problem imaginable. When I'm building a mission-critical system, I don't want to be the first person to implement a library for an obscure payment gateway. I want the battle-tested one." },
      { type: "heading", body: "NestJS: The 'Enterprise' Peace of Mind" },
      { type: "paragraph", body: "Vanilla Node can be messy. NestJS provides the guardrails. It forces a team to speak the same language. When a new developer joins, they don't have to spend a week figuring out 'how we do things here'. They just look at the modules and controllers." },
      { type: "list", items: ["Predictable architecture across different microservices.", "First-class TypeScript support that doesn't feel like an afterthought.", "An incredible CLI that automates the boring parts of development.", "Seamless integration with RabbitMQ, Kafka, and BullMQ for event-driven systems."] },
      { type: "quote", body: "Reliability in production isn't about the newest feature; it's about the fewest surprises. NestJS delivers on that promise." },
    ],
  },
  {
    id: 13,
    type: "engineering-note",
    slug: "mastering-nestjs-architecture-dependency-injection",
    title: "Mastering NestJS: Modular Architecture and Dependency Injection Patterns",
    excerpt: "Why NestJS is the choice for enterprise Node.js apps. A look into providers, modules, and how to keep your business logic clean.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=85",
    tags: ["NestJS", "Architecture", "Backend", "Node.js"],
    createdAt: "2026-06-10",
    readTime: "10 min read",
    content: [
      { type: "paragraph", body: "NestJS brought a sense of order to the Wild West of Node.js backend development. By borrowing heavily from Angular's architectural principles, it provides a structured way to build scalable, testable, and loosely coupled applications. After building several production systems with it, I've realized the power isn't just in the 'magic'—it's in the strict modular boundaries." },
      { type: "heading", body: "The Power of Dependency Injection" },
      { type: "paragraph", body: "In Express, you often find yourself manually importing and instantiating classes or functions, leading to hard-to-test 'spaghetti' code. NestJS's DI container handles the lifecycle of your classes, allowing you to focus on logic." },
      { type: "code", language: "ts", body: "@Injectable()\nexport class OrderService {\n  constructor(\n    private readonly paymentService: PaymentService,\n    private readonly logger: MyCustomLogger,\n  ) {}\n\n  async createOrder(data: OrderDto) {\n    this.logger.log('Creating order...');\n    return this.paymentService.process(data);\n  }\n}" },
      { type: "heading", body: "Modular Thinking" },
      { type: "list", items: ["Encapsulate features into self-contained modules.", "Use Global modules sparingly to avoid dependency hell.", "Leverage Dynamic Modules for configuration and library wrappers.", "Keep your Controllers thin and your Services rich."] },
      { type: "quote", body: "Architecture is the art of deciding which boundaries to draw today so you don't have to rewrite everything tomorrow." },
    ],
  },
  {
    id: 14,
    type: "engineering-note",
    slug: "node-nest-job-market-insights",
    title: "The Node/Nest Job Market: What Engineering Leads Actually Look For",
    excerpt: "Beyond the 'MERN' hype. Why companies are pivoting to NestJS and what skills distinguish a Senior Backend Engineer in 2026.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=85",
    tags: ["Career", "Node.js", "NestJS", "Hiring"],
    createdAt: "2026-06-05",
    readTime: "8 min read",
    content: [
      { type: "paragraph", body: "I've reviewed dozens of technical assignments and sat on both sides of the interview table. The industry is moving away from just 'knowing a framework' towards 'system ownership'. If you're looking for a high-tier Node.js role, specifically with NestJS, you need to prove you can think beyond the CRUD." },
      { type: "heading", body: "The Skills That Get You Hired" },
      { type: "list", items: ["Deep understanding of TypeScript—utility types, generics, and strictness are non-negotiable.", "Database proficiency—you should know when to use raw SQL vs an ORM, and how to optimize indexes.", "Security mindset—understanding OAuth2, JWT rotation, and OWASP Top 10.", "Testing strategy—not just unit tests, but integration and E2E tests that actually prevent regressions."] },
      { type: "heading", body: "Why NestJS is Dominating JDs" },
      { type: "paragraph", body: "Companies want consistency. In a large team, having 10 different ways to write an API is a maintenance nightmare. NestJS enforces a standard. When I see a NestJS candidate, I know they at least understand the concept of a Module and a Provider. It reduces onboarding time and increases code quality across the board." },
    ],
  },
  {
    id: 17,
    type: "case-study",
    slug: "mockuphive-case-study",
    title: "MockupHive: Architecting a Web-Based PSD Editor",
    excerpt: "The technical journey of building a browser-based mockup customization engine using Node.js and advanced canvas logic.",
    coverImage: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1400&q=85",
    tags: ["Case Study", "Canvas", "Node.js", "Editor"],
    createdAt: "2026-05-20",
    readTime: "15 min read",
    content: [
      { type: "heading", body: "The Challenge" },
      { type: "paragraph", body: "MockupHive needed to allow users to upload images and see them rendered on professional Photoshop mockups instantly in the browser. We had to move away from static templates and build a dynamic rendering pipeline." },
      { type: "heading", body: "The Solution" },
      { type: "paragraph", body: "We implemented a custom coordinate-mapping system that translates 2D user uploads into the skewed, perspectived layers of a PSD file using HTML5 Canvas and a Node.js backend for final asset generation." },
      { type: "list", items: [" PERSPECTIVE transforms on the client side.", "Worker-thread based image processing on the backend.", "Stripe integration for asset delivery.", "Real-time state synchronization."] },
    ],
  },
  {
    id: 18,
    type: "case-study",
    slug: "iconiex-development",
    title: "Iconiex: Building a Multi-Platform Icon Ecosystem",
    excerpt: "How we scaled an icon library into a full developer ecosystem with Figma and Adobe plugins.",
    coverImage: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&w=1400&q=85",
    tags: ["Case Study", "Ecosystem", "Plugins", "Backend"],
    createdAt: "2026-05-25",
    readTime: "10 min read",
    content: [
      { type: "heading", body: "Vision" },
      { type: "paragraph", body: "Iconiex wasn't meant to be just another icon site. It was designed to be a tool that lives where designers live. This meant building robust APIs and dedicated plugins for Figma and Adobe Creative Cloud." },
      { type: "heading", body: "Performance at Scale" },
      { type: "paragraph", body: "With thousands of SVGs being requested per minute, we had to optimize our storage and delivery. We used an S3-based storage with a global CDN and pre-optimized SVG minification on upload." },
    ],
  },
  {
    id: 11,
    type: "case-study",
    slug: "edutech-lms-platform-scaling",
    title: "EduTech LMS: Scaling to 50k Concurrent Students",
    excerpt: "A deep dive into the architecture decisions, bottleneck resolutions, and engineering tradeoffs made while building a high-scale learning platform.",
    coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1400&q=85",
    tags: ["Case Study", "Education", "Architecture", "Scaling"],
    createdAt: "2026-05-15",
    readTime: "12 min read",
    previewUrl: "https://example.com/edutech-preview",
    content: [
      { type: "heading", body: "Project Overview" },
      { type: "paragraph", body: "The goal was to build a robust Learning Management System capable of handling rapid spikes during exam seasons. The system needed to support video streaming, real-time quizzes, and complex progress tracking." },
      { type: "heading", body: "Tech Stack Decisions" },
      { type: "list", items: ["Next.js for the student dashboard to enable SEO and fast initial loads.", "Go-based microservices for performance-critical path like quiz engines.", "PostgreSQL with read-replicas for data integrity.", "Redis for real-time leaderboards and session caching."] },
      { type: "heading", body: "Problems Faced & Solutions" },
      { type: "paragraph", body: "The primary challenge was the 'Thundering Herd' problem when 10,000 students joined a live quiz simultaneously. We implemented a message queue based approach and used WebSockets with a specialized gateway service to handle the connection load." },
      { type: "code", language: "go", body: "// Simplified Quiz Gateway Dispatcher\nfunc handleQuizEvent(event Event) {\n    queue.Push(event)\n    go broadcastToStudents(event.RoomID, event.Payload)\n}" },
      { type: "heading", body: "Architecture Decisions" },
      { type: "paragraph", body: "We chose a hexagonal architecture for the core services to keep the business logic isolated from external changes in streaming providers and database drivers." }
    ],
  },
  {
    id: 12,
    type: "case-study",
    slug: "ai-saas-dashboard-design-system",
    title: "AI SaaS Dashboard: From Concept to Production Design System",
    excerpt: "How I designed and implemented a custom design system for an AI-powered data analytics platform with a focus on usability and data density.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85",
    tags: ["Case Study", "AI", "Design System", "Frontend"],
    createdAt: "2026-05-02",
    readTime: "10 min read",
    content: [
      { type: "heading", body: "The Challenge" },
      { type: "paragraph", body: "Building a dashboard that presents complex AI-generated insights without overwhelming the user. We needed a system that felt futuristic yet familiar." },
      { type: "heading", body: "Solution: Atomic Design Pattern" },
      { type: "paragraph", body: "We built a multi-layered design system using Tailwind CSS and Radix UI primitives. This allowed for maximum flexibility while maintaining strict visual consistency." },
      { type: "list", items: ["Custom component library with 50+ primitives.", "Dynamic theme engine for dark/light mode transition.", "High-density data visualization components using D3.js.", "AI feedback loop integrated into the UI."] },
      { type: "heading", body: "Architecture Decisions" },
      { type: "paragraph", body: "We utilized a Mono-repo structure (Turborepo) to share components between the main marketing site and the internal dashboard app." }
    ],
  },
  {
    id: 1,
    type: "engineering-note",
    slug: "redis-caching-optimization-node-api",
    title: "Redis Caching Optimization for High-Traffic Node APIs",
    excerpt: "How I reduced repeated database reads with cache-aside patterns, stable keys, TTL strategy, and safe invalidation.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
    tags: ["Redis", "Backend", "Performance", "Node.js"],
    createdAt: "2026-04-26",
    readTime: "7 min read",
    content: [
      { type: "paragraph", body: "The fastest query is the one your database never has to run. In one API, product metadata was requested repeatedly by dashboards, webhook processors, and public pages. Redis became useful after I stopped treating it as a generic key-value dump and started designing the cache contract like an API." },
      { type: "heading", body: "The cache-aside baseline" },
      { type: "paragraph", body: "I used cache-aside because the application already owned reads and writes. The service checks Redis first, falls back to PostgreSQL, serializes the result, and stores it with a short TTL. Write paths explicitly delete the affected keys." },
      { type: "code", language: "ts", body: "const key = `product:${productId}:summary:v2`;\n\nconst cached = await redis.get(key);\nif (cached) return JSON.parse(cached);\n\nconst product = await productRepository.findSummary(productId);\nawait redis.set(key, JSON.stringify(product), { EX: 60 * 5 });\n\nreturn product;" },
      { type: "heading", body: "What actually improved latency" },
      { type: "list", items: ["Versioned keys so deployments could change response shape safely.", "Short TTLs for volatile records and longer TTLs for reference data.", "Small serialized payloads instead of caching entire ORM entities.", "Metrics for hit rate, miss rate, and stale invalidations."] },
      { type: "quote", body: "Caching is not a shortcut around data modeling. It works best when the ownership rules are boring and explicit." },
    ],
  },
  {
    id: 2,
    type: "engineering-note",
    slug: "docker-deployment-production-node-nextjs",
    title: "Docker Deployment Notes for a Production Node + Next.js App",
    excerpt: "A practical container setup with multi-stage builds, small images, health checks, and environment-safe runtime configuration.",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1400&q=85",
    tags: ["Docker", "DevOps", "Deployment", "Next.js"],
    createdAt: "2026-04-18",
    readTime: "6 min read",
    content: [
      { type: "paragraph", body: "Docker becomes much easier to maintain when the image only contains what the runtime needs. For a portfolio or SaaS-style app, the main wins are repeatable builds, isolated dependencies, and predictable deployment behavior across VPS and CI." },
      { type: "heading", body: "Multi-stage image" },
      { type: "code", language: "dockerfile", body: "FROM node:22-alpine AS deps\nWORKDIR /app\nCOPY package.json pnpm-lock.yaml ./\nRUN corepack enable && pnpm install --frozen-lockfile\n\nFROM node:22-alpine AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\nRUN pnpm build\n\nFROM node:22-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/.next ./.next\nCOPY --from=builder /app/public ./public\nCOPY --from=builder /app/package.json ./package.json\nCMD [\"pnpm\", \"start\"]" },
      { type: "heading", body: "Operational details" },
      { type: "list", items: ["Keep secrets out of the image and inject them at runtime.", "Use health checks so your proxy can stop routing to a broken container.", "Prefer deterministic lockfile installs inside CI.", "Log to stdout and let the host collect logs."] },
    ],
  },
  {
    id: 3,
    type: "engineering-note",
    slug: "react-performance-optimization-render-budget",
    title: "React Performance Optimization with a Render Budget",
    excerpt: "A measured approach to memoization, list rendering, expensive derived state, and interaction responsiveness.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    tags: ["React", "Frontend", "Performance", "UX"],
    createdAt: "2026-04-10",
    readTime: "8 min read",
    content: [
      { type: "paragraph", body: "Most React performance work should start with a profiler trace, not a memo. I like setting a render budget for the interaction first: what should update, what can wait, and what should never rerender during typing or dragging." },
      { type: "heading", body: "Useful memoization" },
      { type: "code", language: "tsx", body: "const filteredProjects = useMemo(() => {\n  return projects.filter((project) => {\n    return activeTags.every((tag) => project.tags.includes(tag));\n  });\n}, [projects, activeTags]);" },
      { type: "paragraph", body: "Memoization helped only after props became stable. I moved inline arrays out of render paths, split large components, and kept animation state close to the elements that needed it." },
      { type: "list", items: ["Profile before optimizing.", "Virtualize long lists.", "Defer non-urgent search and filtering work.", "Avoid passing unstable objects through deep component trees."] },
    ],
  },
  {
    id: 4,
    type: "engineering-note",
    slug: "jwt-authentication-refresh-token-rotation",
    title: "JWT Authentication with Refresh Token Rotation",
    excerpt: "A safer auth flow using short-lived access tokens, rotating refresh tokens, reuse detection, and HTTP-only cookies.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=85",
    tags: ["JWT", "Security", "Backend", "Node.js"],
    createdAt: "2026-03-29",
    readTime: "9 min read",
    content: [
      { type: "paragraph", body: "JWTs are convenient, but the real system design is around expiration, rotation, revocation, and where tokens live in the browser. I prefer short access tokens and refresh tokens stored in HTTP-only secure cookies." },
      { type: "heading", body: "Rotation flow" },
      { type: "list", items: ["Issue a short-lived access token after login.", "Store a hashed refresh token server-side with device metadata.", "On refresh, invalidate the previous token and issue a new pair.", "If an old refresh token appears again, revoke the whole session family."] },
      { type: "code", language: "ts", body: "const incomingHash = hash(refreshToken);\nconst session = await sessions.findByTokenHash(incomingHash);\n\nif (!session || session.revokedAt) {\n  await sessions.revokeFamily(session?.familyId);\n  throw new UnauthorizedError();\n}\n\nawait sessions.rotate(session.id, hash(nextRefreshToken));" },
    ],
  },
  {
    id: 5,
    type: "engineering-note",
    slug: "postgresql-indexing-query-plans",
    title: "PostgreSQL Indexing: Reading Query Plans Before Adding Indexes",
    excerpt: "How to use EXPLAIN ANALYZE, composite indexes, partial indexes, and realistic query patterns without over-indexing.",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1400&q=85",
    tags: ["PostgreSQL", "Database", "Performance", "SQL"],
    createdAt: "2026-03-21",
    readTime: "7 min read",
    content: [
      { type: "paragraph", body: "Indexes are tradeoffs. They speed up reads but add write cost and storage pressure. Before adding one, I capture the slow query, run it with realistic parameters, and inspect whether PostgreSQL is scanning more rows than expected." },
      { type: "code", language: "sql", body: "EXPLAIN ANALYZE\nSELECT id, title, status\nFROM tickets\nWHERE organization_id = $1\n  AND status = 'open'\nORDER BY updated_at DESC\nLIMIT 20;" },
      { type: "heading", body: "Index that matched the access pattern" },
      { type: "code", language: "sql", body: "CREATE INDEX CONCURRENTLY idx_tickets_org_status_updated\nON tickets (organization_id, status, updated_at DESC);" },
      { type: "paragraph", body: "The important detail is column order. The index starts with equality filters, then supports the sort. That made the query plan boring, which is usually the goal." },
    ],
  },
  {
    id: 6,
    type: "engineering-note",
    slug: "websocket-real-time-systems-presence-events",
    title: "WebSocket Real-Time Systems: Presence, Events, and Backpressure",
    excerpt: "Notes from building real-time features with connection lifecycle handling, event contracts, and graceful degradation.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    tags: ["WebSocket", "Realtime", "Backend", "Architecture"],
    createdAt: "2026-03-12",
    readTime: "8 min read",
    content: [
      { type: "paragraph", body: "Real-time systems are less about opening a socket and more about owning state transitions. Users disconnect, tabs sleep, mobile networks drop packets, and servers restart. The design has to expect those events." },
      { type: "heading", body: "Event shape" },
      { type: "code", language: "ts", body: "type RealtimeEvent = {\n  id: string;\n  type: 'message.created' | 'presence.updated';\n  roomId: string;\n  createdAt: string;\n  payload: unknown;\n};" },
      { type: "list", items: ["Use event ids so clients can dedupe.", "Send heartbeat pings and expire stale presence.", "Apply room-level authorization on subscribe, not only on initial connection.", "Plan for backpressure when clients cannot consume events fast enough."] },
    ],
  },
  {
    id: 7,
    type: "engineering-note",
    slug: "linux-vps-deployment-nginx-pm2",
    title: "Linux VPS Deployment with Nginx, PM2, and Zero-Downtime Habits",
    excerpt: "A practical deployment checklist for Node apps on a Linux VPS with reverse proxying, logs, SSL, and process management.",
    coverImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1400&q=85",
    tags: ["Linux", "VPS", "Nginx", "DevOps"],
    createdAt: "2026-03-04",
    readTime: "6 min read",
    content: [
      { type: "paragraph", body: "A VPS is a great teacher because every operational decision is visible. I keep the setup simple: Nginx terminates SSL and proxies traffic, the app runs as a managed process, logs are rotated, and deploys are repeatable." },
      { type: "code", language: "nginx", body: "server {\n  server_name api.example.com;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n  }\n}" },
      { type: "list", items: ["Create a non-root deploy user.", "Use a firewall and expose only SSH, HTTP, and HTTPS.", "Keep environment files outside the repository.", "Restart through a script so deployment steps stay consistent."] },
    ],
  },
  {
    id: 8,
    type: "engineering-note",
    slug: "cicd-pipelines-quality-gates",
    title: "CI/CD Pipelines with Quality Gates That Actually Help",
    excerpt: "A pipeline design that runs fast checks early, protects main, builds artifacts once, and deploys with confidence.",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1400&q=85",
    tags: ["CI/CD", "GitHub Actions", "DevOps", "Testing"],
    createdAt: "2026-02-25",
    readTime: "5 min read",
    content: [
      { type: "paragraph", body: "A good pipeline gives fast feedback without becoming theater. I split checks into layers: formatting and types first, unit tests next, then build and deployment steps only after the cheap failures are out of the way." },
      { type: "code", language: "yaml", body: "name: quality\non: [push, pull_request]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: pnpm/action-setup@v4\n      - run: pnpm install --frozen-lockfile\n      - run: pnpm lint\n      - run: pnpm test\n      - run: pnpm build" },
      { type: "paragraph", body: "The highest leverage change was making the build artifact immutable. The same artifact that passed CI is the one deployed, which removes a whole class of environment surprises." },
    ],
  },
];

export const blogTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();

export const getBlogBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const getRelatedPosts = (post: BlogPost, limit = 3) => {
  return blogPosts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || new Date(b.post.createdAt).getTime() - new Date(a.post.createdAt).getTime())
    .slice(0, limit)
    .map(({ post }) => post);
};
