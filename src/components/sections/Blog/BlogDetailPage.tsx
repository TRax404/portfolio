"use client";

import { useRef, useEffect, useState } from "react";
import { IconArrowLeft, IconCalendar, IconClock, IconTag, IconShare, IconChevronRight, IconNotes, IconRocket, IconSparkles } from "@tabler/icons-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getBlogBySlug, getRelatedPosts } from "@/data/blogs";
import BlogCard from "./BlogCard";
import { formatBlogDate } from "./blogUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = slug ? getBlogBySlug(slug) : undefined;
  const [readingProgress, setReadingProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (!post) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".detail-reveal",
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.1, delay: 0.2 }
    );

    gsap.to(heroImageRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const blocks = gsap.utils.toArray<HTMLElement>(".prose-block");
    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [post]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const relatedPosts = getRelatedPosts(post);
  const isCaseStudy = post.type === "case-study";

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#030712] pb-32 pt-24 text-white">
      <div className="fixed left-0 top-0 z-[100] h-1.5 w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-75 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[70%] w-[70%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="detail-reveal mb-12 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-white/20 group-hover:bg-white/10">
              <IconArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </div>
            Back to Insights
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400">
            <IconShare size={18} />
          </button>
        </div>

        <article className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px]">
          <div className="space-y-16">
            <header ref={headerRef} className="detail-reveal relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0a0f1d]/60 shadow-3xl backdrop-blur-3xl">
              <div className="relative h-[400px] overflow-hidden md:h-[550px]">
                <img
                  ref={heroImageRef}
                  src={post.coverImage}
                  alt=""
                  className="h-[120%] w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <div className="mb-6 flex flex-wrap gap-3">
                    <div className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.7rem] font-black uppercase tracking-widest backdrop-blur-md ${isCaseStudy
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                        : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
                      }`}>
                      {isCaseStudy ? <IconRocket size={14} /> : <IconNotes size={14} />}
                      {isCaseStudy ? "Case Study" : "Engineering Note"}
                    </div>
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md">
                        <IconTag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="font-poppins text-4xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                    {post.title}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 border-t border-white/5 px-8 py-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 md:px-16">
                <span className="flex items-center gap-2">
                  <IconCalendar size={18} className="text-cyan-500" />
                  {formatBlogDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <IconClock size={18} className="text-indigo-400" />
                  {post.readTime}
                </span>
                <div className="hidden sm:flex ml-auto items-center gap-4">
                  <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${readingProgress}%` }} />
                  </div>
                  <span className="text-cyan-400 min-w-[3rem] text-right">{Math.round(readingProgress)}%</span>
                </div>
              </div>
            </header>

            <div ref={contentRef} className="detail-reveal blog-prose-premium max-w-none space-y-12 rounded-[3rem] border border-white/5 bg-[#0a0f1d]/20 p-8 md:p-16 backdrop-blur-xl">
              <p className="prose-block text-xl leading-relaxed text-slate-300 font-medium italic border-l-4 border-cyan-500/40 pl-8 py-2">
                {post.excerpt}
              </p>

              {post.content.map((block, index) => {
                if (block.type === "heading") {
                  return <h2 key={index} className="prose-block group flex items-center gap-6 pt-12 first:pt-0">
                    <span className="text-white font-poppins font-black uppercase tracking-wider whitespace-nowrap">{block.body}</span>
                    <span className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                  </h2>;
                }

                if (block.type === "paragraph") {
                  return <p key={index} className="prose-block text-lg leading-[1.8] text-slate-400">{block.body}</p>;
                }

                if (block.type === "list") {
                  return (
                    <ul key={index} className="prose-block space-y-5">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-lg text-slate-400">
                          <div className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote key={index} className="prose-block relative rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-10">
                      <p className="relative z-10 text-2xl font-poppins font-bold text-cyan-50 leading-relaxed italic">
                        "{block.body}"
                      </p>
                    </blockquote>
                  );
                }

                return (
                  <div key={index} className="prose-block group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#020617] shadow-3xl">
                    <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/40" />
                        <div className="h-3 w-3 rounded-full bg-amber-500/40" />
                        <div className="h-3 w-3 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-slate-500">{block.language}</span>
                    </div>
                    <pre className="overflow-x-auto p-8 font-mono text-sm leading-relaxed text-sky-200 scrollbar-hide">
                      <code>{block.body}</code>
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="detail-reveal">
            <div className="lg:sticky lg:top-32 space-y-12">
              <div className="rounded-[2.5rem] border border-white/5 bg-[#0a0f1d]/40 p-8 backdrop-blur-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 shadow-inner">
                  <IconSparkles size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Tirtho Ray</h3>
                <p className="text-sm leading-relaxed text-slate-500 mb-8">
                  Full Stack Engineer specializing in high-performance systems and cinematic user interfaces.
                </p>
                <div className="h-px w-full bg-white/5 mb-8" />
                <button className="w-full rounded-xl bg-white/10 py-4 text-[0.65rem] font-bold uppercase tracking-widest text-white transition-all hover:bg-cyan-500/20 hover:text-cyan-200 active:scale-95">
                  Follow Journey
                </button>
              </div>

              {relatedPosts.length > 0 && (
                <div className="space-y-8">
                  <h3 className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.25em] text-slate-500 px-2">
                    <IconChevronRight size={18} className="text-cyan-500" />
                    Related Insights
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        to={`/blogs/${related.slug}`}
                        className="group block rounded-2xl border border-white/5 bg-[#0a0f1d]/40 p-5 transition-all hover:border-cyan-500/30 hover:bg-[#0a0f1d]/80"
                      >
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-cyan-500/60 mb-3 flex items-center gap-2">
                          {related.type === 'case-study' ? <IconRocket size={12} /> : <IconNotes size={12} />}
                          {related.type === 'case-study' ? 'Case Study' : 'Engineering Note'}
                        </p>
                        <h4 className="text-sm font-bold text-slate-300 line-clamp-2 transition-colors group-hover:text-white leading-snug">
                          {related.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </article>
      </div>
    </main>
  );
};

export default BlogDetailPage;
