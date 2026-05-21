"use client";

import { useRef, useEffect, useState } from "react";
import { IconArrowLeft, IconCalendar, IconTag, IconShare, IconChevronRight, IconRocket, IconSparkles, IconExternalLink } from "@tabler/icons-react";
import { Link, Navigate, useParams } from "react-router-dom";
import projects, { getProjectById } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = id ? getProjectById(id) : undefined;
  const [readingProgress, setReadingProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
    if (!project) return;

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
  }, [project]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 3);

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
          <a
            href="/projects"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-white/20 group-hover:bg-white/10">
              <IconArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </div>
            Back to Projects
          </a>
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
                  src={project.project_thumnail}
                  alt=""
                  className="h-[120%] w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <div className="mb-6 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-200 px-4 py-1.5 text-[0.7rem] font-black uppercase tracking-widest backdrop-blur-md">
                      <IconRocket size={14} />
                      Project Infrastructure
                    </div>
                    {project.technology.slice(0, 3).map((tech) => (
                      <span key={tech} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md">
                        <IconTag size={14} />
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h1 className="font-poppins text-3xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                    {project.project_name}
                  </h1>
                  <div className="mt-8 flex flex-wrap gap-4">
                    {project.live_link && (
                      <a 
                        href={project.live_link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-6 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-slate-950 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"
                      >
                        <IconExternalLink size={18} />
                        Live Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 border-t border-white/5 px-8 py-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500 md:px-16">
                <span className="flex items-center gap-2">
                  <IconCalendar size={18} className="text-cyan-500" />
                  {project.createdAt}
                </span>
                {project.company && (
                  <span className="flex items-center gap-2">
                    <IconSparkles size={18} className="text-indigo-400" />
                    {project.company.name}
                  </span>
                )}
                <div className="hidden sm:flex ml-auto items-center gap-4">
                  <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${readingProgress}%` }} />
                  </div>
                  <span className="text-cyan-400 min-w-[3rem] text-right">{Math.round(readingProgress)}%</span>
                </div>
              </div>
            </header>

            <div ref={contentRef} className="detail-reveal blog-prose-premium max-w-none space-y-12 rounded-[3rem] border border-white/5 bg-[#0a0f1d]/20 p-8 md:p-16 backdrop-blur-xl">
              <p className="prose-block text-lg leading-relaxed text-slate-300 font-medium italic border-l-4 border-cyan-500/40 pl-6 py-2">
                {project.description}
              </p>

              {project.content.map((block, index) => {
                if (block.type === "heading") {
                  return <h2 key={index} className="prose-block group flex items-center gap-6 pt-10 first:pt-0">
                    <span className="text-white font-poppins text-lg md:text-xl font-black uppercase tracking-wider whitespace-nowrap">{block.body}</span>
                    <span className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                  </h2>;
                }

                if (block.type === "paragraph") {
                  return <p key={index} className="prose-block text-base md:text-[1.05rem] leading-[1.8] text-slate-400">{block.body}</p>;
                }

                if (block.type === "list") {
                  return (
                    <ul key={index} className="prose-block space-y-5">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-base md:text-[1.05rem] text-slate-400">
                          <div className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote key={index} className="prose-block relative rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 md:p-10">
                      <p className="relative z-10 text-xl font-poppins font-bold text-cyan-50 leading-relaxed italic">
                        "{block.body}"
                      </p>
                    </blockquote>
                  );
                }

                if (block.type === "code") {
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
                }

                return null;
              })}
            </div>
          </div>

          <aside className="detail-reveal">
            <div className="lg:sticky lg:top-32 space-y-12">
              <div className="rounded-[2.5rem] border border-white/5 bg-[#0a0f1d]/40 p-8 backdrop-blur-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 shadow-inner">
                  <IconSparkles size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Technical Stack</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technology.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-slate-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {relatedProjects.length > 0 && (
                <div className="space-y-8">
                  <h3 className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.25em] text-slate-500 px-2">
                    <IconChevronRight size={18} className="text-cyan-500" />
                    Other Projects
                  </h3>
                  <div className="space-y-4">
                    {relatedProjects.map((related) => (
                      <Link
                        key={related.id}
                        to={`/project/${related.id}`}
                        className="group block rounded-2xl border border-white/5 bg-[#0a0f1d]/40 p-5 transition-all hover:border-cyan-500/30 hover:bg-[#0a0f1d]/80"
                      >
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-cyan-500/60 mb-3 flex items-center gap-2">
                          <IconRocket size={12} />
                          Project
                        </p>
                        <h4 className="text-sm font-bold text-slate-300 line-clamp-2 transition-colors group-hover:text-white leading-snug">
                          {related.project_name}
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

export default ProjectDetailPage;
