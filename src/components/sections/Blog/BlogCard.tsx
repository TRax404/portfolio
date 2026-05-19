"use client";

import { useRef, useEffect, useState } from "react";
import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import { Link as RouterLink } from "react-router-dom";
import Link from "next/link";
import { BlogPost } from "@/data/blogs";
import { formatBlogDate } from "./blogUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  compact?: boolean;
}

const BlogCard = ({ post, index = 0, compact = false }: BlogCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const [isRouterContext, setIsRouterContext] = useState(false);

  useEffect(() => {
    // Check if we are inside a react-router context
    // This is a bit hacky but works for mixed Next.js/React Router apps
    const checkRouter = () => {
      try {
        // We just need to check if we are in the /blogs path or if we can find a router
        // Alternatively, we can just check if window.location.pathname starts with /blogs
        if (window.location.pathname.startsWith("/blogs")) {
          setIsRouterContext(true);
        }
      } catch (e) {
        setIsRouterContext(false);
      }
    };
    checkRouter();
  }, []);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        delay: Math.min(index * 0.1, 0.5),
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: cardRef });

  const content = (
    <>
      <div className={compact ? "relative h-44 overflow-hidden" : "relative h-56 overflow-hidden"}>
        <img
          src={post.coverImage}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-2"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/34 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md transition-colors duration-300 group-hover:border-cyan-500/50 group-hover:text-white">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
          <span className="inline-flex items-center gap-1.5 transition-colors duration-300 group-hover:text-slate-300">
            <IconCalendar size={15} aria-hidden="true" />
            {formatBlogDate(post.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5 transition-colors duration-300 group-hover:text-slate-300">
            <IconClock size={15} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h2 className={compact ? "text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-50" : "text-xl font-bold leading-snug text-white md:text-2xl transition-colors duration-300 group-hover:text-cyan-50"}>
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">{post.excerpt}</p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition-all duration-300 group-hover:gap-3 group-hover:text-cyan-400">
          Read More
          <IconArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </>
  );

  return (
    <article
      ref={cardRef}
      className="blog-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/40 hover:bg-white/[0.09] hover:shadow-cyan-500/10"
    >
      {isRouterContext ? (
        <RouterLink to={`/${post.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          {content}
        </RouterLink>
      ) : (
        <Link href={`/blogs/${post.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
          {content}
        </Link>
      )}
    </article>
  );
};

export default BlogCard;
