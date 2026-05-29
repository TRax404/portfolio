"use client";

import { useRef, useEffect, useState } from "react";
import { IconArrowRight, IconCalendar, IconClock, IconNotes, IconRocket, IconExternalLink } from "@tabler/icons-react";
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
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isRouterContext, setIsRouterContext] = useState(false);

  useEffect(() => {
    const checkRouter = () => {
      try {
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

    // Entrance Animation
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 60,
        rotateX: -15,
        filter: "blur(15px)",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.2,
        delay: Math.min(index * 0.1, 0.5),
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: cardRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;

    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const isCaseStudy = post.type === "case-study";

  const content = (
    <>
      <div className={compact ? "relative h-44 overflow-hidden" : "relative h-56 overflow-hidden"}>
        <img
          ref={imageRef}
          src={post.coverImage}
          alt={post.title}
          className="h-[120%] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/20 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
        
        {/* Type Badge */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 pr-12">
          <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${
            isCaseStudy 
              ? "border-amber-500/30 bg-amber-500/10 text-amber-200" 
              : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
          }`}>
            {isCaseStudy ? <IconRocket size={12} /> : <IconNotes size={12} />}
            {isCaseStudy ? "Case Study" : "Engineering Note"}
          </div>
        </div>

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <span key={tag} className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 text-[0.6rem] font-medium text-slate-300 backdrop-blur-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-[0.7rem] font-semibold text-slate-500 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 transition-colors duration-300 group-hover:text-slate-400">
            <IconCalendar size={14} />
            {formatBlogDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5 transition-colors duration-300 group-hover:text-slate-400">
            <IconClock size={14} />
            {post.readTime}
          </span>
        </div>

        <h2 className={`font-poppins transition-colors duration-300 group-hover:text-white ${
          compact ? "text-lg font-bold leading-tight" : "text-xl font-bold leading-tight md:text-2xl"
        } text-slate-100 mb-3`}>
          {post.title}
        </h2>
        
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300 mb-6">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div 
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 transition-all duration-300 group-hover:text-cyan-300 group-hover:gap-3"
          >
            Read Story
            <div className="h-8 w-8 rounded-full border border-cyan-500/20 flex items-center justify-center bg-cyan-500/5 transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40">
              <IconArrowRight size={14} />
            </div>
          </div>
          
          <div className="h-px flex-grow ml-6 bg-gradient-to-r from-cyan-500/20 to-transparent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </div>
      </div>
    </>
  );

  return (
    <article
      ref={cardRef}
      className="blog-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f1d]/40 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-[#0a0f1d]/60"
      style={{ perspective: "1000px" }}
    >
      {/* Decorative Glow */}
      <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[80px] transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${
        isCaseStudy ? "bg-amber-500" : "bg-cyan-500"
      }`} />

      {isRouterContext ? (
        <RouterLink to={`/${post.slug}`} className="flex flex-col flex-grow focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50">
          {content}
        </RouterLink>
      ) : (
        <Link href={`/blogs/${post.slug}`} className="flex flex-col flex-grow focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50">
          {content}
        </Link>
      )}

      {isCaseStudy && post.previewUrl && (
        <a
          href={post.previewUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-slate-300 backdrop-blur-md border border-white/10 transition-all hover:bg-cyan-500 hover:text-white hover:border-cyan-400 hover:scale-110 shadow-xl"
          onClick={(e) => e.stopPropagation()}
          title="Project Preview"
        >
          <IconExternalLink size={16} />
        </a>
      )}
    </article>
  );
};

export default BlogCard;
