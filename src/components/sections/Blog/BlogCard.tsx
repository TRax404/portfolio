"use client";

import { IconArrowRight, IconCalendar, IconClock } from "@tabler/icons-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogs";
import { formatBlogDate } from "./blogUtils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  compact?: boolean;
}

const BlogCard = ({ post, index = 0, compact = false }: BlogCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.045, 0.22), ease: "easeOut" }}
      className="blog-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
    >
      <Link to={`/${post.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
        <div className={compact ? "relative h-44 overflow-hidden" : "relative h-56 overflow-hidden"}>
          <img
            src={post.coverImage}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/34 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar size={15} aria-hidden="true" />
              {formatBlogDate(post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock size={15} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>

          <h2 className={compact ? "text-lg font-bold leading-snug text-white" : "text-xl font-bold leading-snug text-white md:text-2xl"}>
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{post.excerpt}</p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition group-hover:text-white">
            Read More
            <IconArrowRight size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
