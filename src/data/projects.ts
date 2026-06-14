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
  images?: string[];
}

const projects: Project[] = [
  {
    id: 5,
    slug: "tape",
    project_name: "Tape | Digital Signage Platform (Team Lead)",
    description:
      "Enterprise SaaS platform for remotely managing billboards and Android TVs. Businesses connect screens via QR code, upload media content, schedule playback, and monitor devices in real time. Led the full team across backend, Flutter, frontend, and design.",
    project_thumnail: LINKS.tape_thumbnail,
    technology: ["NestJS", "PostgreSQL", "BullMQ", "Redis", "Socket.io", "AWS", "Docker", "Nginx", "Flutter"],
    live_link: LINKS.tape_live,
    createdAt: "2024-05-15",
    images: [
      "https://i.ibb.co.com/wZCrQS0m/1.png",
      "https://i.ibb.co.com/27CWQXd2/2.png",
      "https://i.ibb.co.com/1tNgwV5f/3.png",
      "https://i.ibb.co.com/Vc5j1bc1/4.png",
      "https://i.ibb.co.com/zHGKms4D/5.png",
      "https://i.ibb.co.com/XfxfbKRm/6.png",
      "https://i.ibb.co.com/bg32rr0w/A1.png",
      "https://i.ibb.co.com/xtV3HVqv/A2.png",
      "https://i.ibb.co.com/RT45Y2L7/A3.png",
      "https://i.ibb.co.com/PGhP0t3C/A4.png",
      "https://i.ibb.co.com/bMF8SXrh/A5.png",
      "https://i.ibb.co.com/5hPS6j6Y/A6.png",
      "https://i.ibb.co.com/NdFqhTWs/A7.png",
      "https://i.ibb.co.com/xqqkkGR1/A8.png",
      "https://i.ibb.co.com/N2TmFW1z/A9.png",
      "https://i.ibb.co.com/C3CTNhG7/A10.png",
      "https://i.ibb.co.com/qMpgjYcM/A11.png",
    ],
    content: [
      { type: "heading", body: "What is Tape?" },
      {
        type: "paragraph",
        body: "Have you ever walked into a shopping mall and noticed the large Android TVs displaying ads, announcements, or promotions? Someone has to manage all of that — uploading content, scheduling when each video plays, and making sure everything stays in sync across dozens of screens.",
      },
      {
        type: "paragraph",
        body: "Tape is a B2B SaaS platform that does exactly this. Businesses purchase access to Tape, connect their billboards and Android TVs to the platform, and manage all their screens from a single web dashboard — uploading videos, scheduling content by time, and monitoring device status in real time.",
      },
      { type: "heading", body: "The Problems We Had to Solve" },
      {
        type: "paragraph",
        body: "Building Tape was not straightforward. It came with three hard engineering problems that shaped the entire architecture:",
      },
      {
        type: "list",
        items: [
          "Securely Connecting a Physical Device to a Web Account: Scan a QR code and have it linked securely and persistently.",
          "Reliable Content Delivery: Downloading large videos in chunks for quick playback and full offline support.",
          "Scale Without Blocking: Handling heavy operations like video processing and email delivery asynchronously.",
        ],
      },
      { type: "heading", body: "How We Solved It" },
      { type: "heading", body: "Secure QR Device Pairing" },
      {
        type: "paragraph",
        body: "When the Flutter app is installed on a device, it generates a unique QR code containing a Base64-encoded token. When a user scans this on the web dashboard, the backend links the device using a custom JWT designed to prevent token reuse and hijacking. For reconnection, secondary signed tokens ensure a seamless experience.",
      },
      { type: "heading", body: "Chunked Content Delivery + Offline Sync" },
      {
        type: "paragraph",
        body: "Instead of downloading full video files, we broke content into 15-second chunks. This allows playback to start quickly, failed chunks to be retried easily, and devices to work fully offline. An auto-sync job ensures all connected devices automatically download new files whenever a program is updated.",
      },
      { type: "heading", body: "BullMQ Job Queues" },
      {
        type: "paragraph",
        body: "All heavy tasks run through BullMQ: async video processing, email delivery via AWS SES, and scheduled content sync jobs. This keeps the API fast and responsive regardless of background load.",
      },
      { type: "heading", body: "My Contribution" },
      {
        type: "paragraph",
        body: "I was responsible for the full backend architecture and led the entire cross-functional team (Backend, Flutter, Frontend, and Design).",
      },
      {
        type: "list",
        items: [
          "Designed and implemented the QR pairing and JWT reconnection system.",
          "Built the chunked content delivery pipeline and offline sync logic.",
          "Set up BullMQ queues for asynchronous processing and task distribution.",
          "Implemented the Socket.io real-time presence layer for live monitoring.",
          "Built the full admin panel backend (device management, dynamic payments, support access).",
          "Deployed the system on AWS EC2 with Docker + Nginx, S3 for storage, and SES for emails.",
        ],
      },
      { type: "heading", body: "Key Takeaways" },
      {
        type: "quote",
        body: "The hardest problems in software are not always about writing complex algorithms — they are about designing systems that are reliable under real-world conditions: unstable networks, large files, and physical hardware.",
      },
      {
        type: "paragraph",
        body: "Leading a cross-functional team showed me that clear architecture and early API contracts are the most powerful tools a tech lead has. When everyone knows what to build and how the pieces connect, the team moves fast.",
      },
    ],
  },
  {
    id: 6,
    slug: "theta-analyzer",
    project_name: "Theta Analyzer | B2B Data Analyzer Platform",
    description:
      "Enterprise B2B SaaS with 3 panels (Client, Manager, Worker) featuring 42 dynamic nested charts for tracking construction, finance, and operational project data at unlimited hierarchy depth.",
    project_thumnail: LINKS.theta_analyzer_thumbnail,
    technology: ["NestJS", "PostgreSQL", "Socket.io", "TypeScript", "Next.js"],
    live_link: LINKS.theta_analyzer_live,
    createdAt: "2024-04-20",
    images: [
      "https://i.ibb.co.com/20TcBSvX/1.png",
      "https://i.ibb.co.com/vxxyCcC3/2.png",
      "https://i.ibb.co.com/4RPxNKch/3.png",
      "https://i.ibb.co.com/r2cHVxc4/4.png",
      "https://i.ibb.co.com/N24K5mVM/5.png",
      "https://i.ibb.co.com/cScK96CG/6.png",
      "https://i.ibb.co.com/SDmRwLbc/7.png",
      "https://i.ibb.co.com/RpN3637z/8.png",
      "https://i.ibb.co.com/F4WTMrNC/9.png",
      "https://i.ibb.co.com/ynDZC7cn/10.png",
    ],
    content: [
      { type: "heading", body: "What is Theta Analyzer?" },
      {
        type: "paragraph",
        body: "Theta Analyzer is an enterprise B2B SaaS platform built for companies that need to track complex, multi-level projects — construction sites, operations, finance, and more. A company purchases Theta Analyzer, and their teams use it through three dedicated panels: Client, Manager, and Worker.",
      },
      {
        type: "paragraph",
        body: "The core feature of Theta Analyzer is its dynamic nested chart system — 42 different chart types that can visualize any project hierarchy, no matter how deep or irregular. Think of a construction company tracking 4 buildings, each with multiple floors, each floor with multiple rooms, and each room with multiple ongoing tasks — all with progress percentages and budget tracking at every level.",
      },
      { type: "heading", body: "The Problems We Had to Solve" },
      { type: "heading", body: "Problem 1: Unstructured Tree Data at Unlimited Depth" },
      {
        type: "paragraph",
        body: "Most tree data structures are fixed — you define how many levels there are and how many children each node can have. Theta Analyzer had no such luxury. A project could have 1 parent with 10 children, or 1 parent with 2 children, each with 6 grandchildren, or any combination, at any depth.",
      },
      {
        type: "paragraph",
        body: "This meant the standard approaches — fixed nested objects, relational joins with known depth — would not work. We needed a data architecture that could represent any tree shape, calculate progress at every node, and feed it cleanly into 42 different chart types.",
      },
      { type: "heading", body: "Problem 2: Excel and Charts Need to Stay in Sync" },
      {
        type: "list",
        items: [
          "Export any nested chart as a structured Excel sheet.",
          "Allow managers to edit the sheet offline.",
          "Re-upload the sheet and have the charts update automatically — after approval.",
        ],
      },
      {
        type: "paragraph",
        body: "The challenge was that Excel is flat and charts are hierarchical. Converting between them without losing the tree structure was a non-trivial serialization problem.",
      },
      { type: "heading", body: "How We Solved It" },
      { type: "heading", body: "Array-of-Arrays JSON Architecture" },
      {
        type: "paragraph",
        body: "We landed on an array-of-arrays JSON structure to represent the project hierarchy. Each node in the tree stores its own data along with references to its children — but the children themselves are stored as flat arrays that can be looked up by ID. This gave us unlimited depth, fast lookups (no recursive database queries), and full chart compatibility.",
      },
      { type: "heading", body: "WebSocket Support Panel" },
      {
        type: "paragraph",
        body: "The entire support panel backend was built on Socket.io for real-time communication. Clients raise tickets, admins assign specialists, and they communicate in a real-time chat thread. We scaled the Socket.io implementation to handle 200 concurrent message deliveries simultaneously.",
      },
      { type: "heading", body: "My Contribution" },
      {
        type: "list",
        items: [
          "Built the full Support Panel backend from scratch, including real-time messaging and ticket lifecycle management.",
          "Designed the array-of-arrays JSON architecture powering 42 dynamic nested charts.",
          "Defined the API contracts between backend APIs and dynamic visualization components.",
          "Collaborated on the Excel export/import pipeline serialization logic.",
        ],
      },
      { type: "heading", body: "Key Takeaways" },
      {
        type: "quote",
        body: "Data architecture is everything. The unstructured tree problem could have been solved many ways — but the wrong choice would have made every chart slow and every calculation expensive.",
      },
      {
        type: "quote",
        body: "Real-time systems require deliberate design. It is easy to add Socket.io and call it real-time. It is harder to make sure it stays reliable when 200 clients are all active at the same time.",
      },
    ],
  },
  {
    id: 7,
    slug: "i-am-ear",
    project_name: "I Am Ear | Peer Support Platform (Team Lead)",
    description:
      "A peer-to-peer emotional support platform with real-time audio calls, messaging, and a secure payment session system. Engineered for high reliability and horizontal scaling across multiple servers.",
    project_thumnail: LINKS.i_am_ear_thumbnail,
    technology: [
      "NestJS",
      "PostgreSQL",
      "BullMQ",
      "Redis",
      "Socket.io",
      "Agora",
      "AWS",
      "Docker",
      "Nginx",
      "Firebase FCM",
      "Flutter",
    ],
    createdAt: "2024-06-10",
    content: [
      { type: "heading", body: "What is I Am Ear?" },
      {
        type: "paragraph",
        body: "Mental health support should not require a therapist's appointment or a waiting list. I Am Ear is a peer-to-peer emotional support platform built around two roles: Voice (those seeking support) and Ear (trained listeners). Users can book sessions for real-time text chat or audio calls, providing immediate emotional connection when it is needed most.",
      },
      { type: "heading", body: "Engineering for Reliability" },
      {
        type: "paragraph",
        body: "Building a platform that handles both real-time communication and financial transactions required solving complex distributed systems problems.",
      },
      { type: "heading", body: "1-Minute Session Window & Automatic Rollback" },
      {
        type: "paragraph",
        body: "To ensure user trust, I built a bulletproof money management system. Every booking has a 1-minute server-side countdown. If the Ear doesn't accept the session within that window, the system automatically triggers a full real-time refund. This logic is handled entirely on the backend to prevent client-side failures from affecting financial integrity.",
      },
      { type: "heading", body: "Scalable Real-Time Infrastructure" },
      {
        type: "paragraph",
        body: "We integrated Agora for low-latency audio calls and scaled Socket.io to handle 200 concurrent messaging sessions. To ensure safety and quality, every conversation is recorded and stored securely—audio to AWS S3 and text to PostgreSQL.",
      },
      { type: "heading", body: "Horizontal Scaling & Load Balancing" },
      {
        type: "paragraph",
        body: "I architected the backend to run across multiple AWS EC2 instances using Docker. An Nginx load balancer uses a round-robin algorithm to distribute traffic, while Redis serves as a Socket.io pub/sub adapter to maintain unified state across the cluster. This removed single points of failure and allowed the system to absorb significant traffic spikes.",
      },
      { type: "heading", body: "My Contribution" },
      {
        type: "list",
        items: [
          "Sole Backend Architect: Designed the entire payment session, rollback logic, and real-time scaling strategy.",
          "Team Lead: Led cross-functional teams across Flutter, Frontend, and Design, defining all API contracts for parallel development.",
          "Infrastructure Lead: Configured horizontal scaling with Docker, Nginx, and AWS EC2.",
          "Algorithm Design: Developed the intelligent Ear matching algorithm based on interests, dedication, and ratings.",
        ],
      },
      { type: "heading", body: "Key Takeaways" },
      {
        type: "quote",
        body: "Distributed systems require you to think like a systems engineer. The server must own the state—especially for financial rollbacks—because the client cannot be trusted in unstable network conditions.",
      },
    ],
  },
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
  {
    id: 8,
    slug: "follow-me",
    project_name: "Follow Me | Influencer Engagement Platform",
    description:
      "A next-generation influencer platform where users can buy and sell followers, likes, and engagement. Built with a focus on real-time transactions and secure payments.",
    project_thumnail: "https://i.ibb.co.com/v6GvH3r/follow-me-thumbnail.png",
    technology: ["TypeScript", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    client_github_link: "https://github.com/Tirtho-Ray/follow-me",
    createdAt: "2024-11-20",
    content: [
      { type: "heading", body: "Concept" },
      { type: "paragraph", body: "Follow Me was designed to streamline the process of social media engagement. It provides a marketplace for influencers and brands to connect and grow their presence." },
      { type: "heading", body: "Key Features" },
      { type: "list", items: ["Real-time engagement tracking.", "Secure payment gateway integration.", "Automated social media API interactions.", "User-friendly dashboard for influencers."] }
    ]
  },
  {
    id: 9,
    slug: "bd-education-result",
    project_name: "Bangladesh Education Result Platform",
    description:
      "A digital result management system allowing schools to publish results and students to search via School/Roll Number. Focused on high-speed search and scalability.",
    project_thumnail: "https://i.ibb.co.com/LhB2P4N/bd-result-thumbnail.png",
    technology: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    createdAt: "2024-08-10",
    content: [
      { type: "heading", body: "The Problem" },
      { type: "paragraph", body: "Traditional result publication methods are slow and often crash under high load. This platform solves that with a highly optimized search architecture." },
      { type: "heading", body: "Highlights" },
      { type: "list", items: ["School-wise result publishing.", "Search by Roll and Registration number.", "PDF result sheet generation.", "Admin panel for result management."] }
    ]
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectById = (id: string | number) => projects.find((p) => String(p.id) === String(id));

export default projects;
