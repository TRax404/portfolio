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
  content: BlogContentBlock[];
}

export const blogPosts: BlogPost[] = [
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
