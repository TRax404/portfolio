"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { IconSearch, IconSparkles, IconX, IconNotes, IconRocket, IconFilter, IconChevronDown } from "@tabler/icons-react";
import { blogPosts, blogTags, BlogType } from "@/data/blogs";
import BlogCard from "./BlogCard";
import BlogListSkeleton from "./BlogListSkeleton";
import { getPlainContent } from "./blogUtils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PAGE_SIZE = 6;

const BlogListPage = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | BlogType>("all");
  const [activeTag, setActiveTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeTab, activeTag]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);

    return blogPosts.filter((post) => {
      const matchesType = activeTab === "all" || post.type === activeTab;
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      const searchable = `${post.title} ${post.excerpt} ${post.tags.join(" ")} ${getPlainContent(post.content)}`.toLowerCase();
      
      const matchesQuery = !normalizedQuery || queryTerms.every(term => searchable.includes(term));

      return matchesType && matchesTag && matchesQuery;
    });
  }, [activeTab, activeTag, query]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredPosts.length;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".blog-header-reveal",
      { opacity: 0, y: 30, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.08, delay: 0.1 }
    );

    tl.fromTo(
      filterRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.6 },
      "-=0.5"
    );
  }, []);

  // Tab indicator animation
  useGSAP(() => {
    const activeTabButton = tabRefs.current[activeTab];
    if (activeTabButton && activeTabRef.current) {
      const { offsetLeft, offsetWidth } = activeTabButton;
      gsap.to(activeTabRef.current, {
        left: offsetLeft,
        width: offsetWidth,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [activeTab, loading]);

  useGSAP(() => {
    if (!gridRef.current || loading) return;

    const cards = gridRef.current.children;
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    }
  }, [activeTab, activeTag, query, loading, visibleCount]);


  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#030712] px-4 py-32 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="blog-grid-bg absolute inset-0 opacity-40" />
        <div className="blog-particles absolute inset-0" />
        <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-indigo-500/10 blur-[140px] animate-pulse" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto mb-24 max-w-4xl text-center">
          <div className="blog-header-reveal mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-cyan-400">
            <IconSparkles size={16} />
            Engineering Journal
          </div>
          <h1 id="blog-heading" className="blog-header-reveal font-poppins text-3xl font-black leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Notes from <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Real Builds</span>
          </h1>
          <p className="blog-header-reveal mx-auto mt-10 max-w-3xl text-base leading-relaxed text-slate-400 md:text-xl md:leading-relaxed">
            A unified collection of deep technical dives, architectural patterns, and real-world project breakthroughs from production environments.
          </p>
        </div>

        <div
          ref={filterRef}
          className="mb-20 flex flex-col gap-6 rounded-[2.5rem] border border-white/5 bg-[#0a0f1d]/40 p-8 shadow-3xl backdrop-blur-3xl md:p-10"
        >
          {/* Top Row */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 xl:gap-6">
            {/* Tabs */}
            <div className="relative flex flex-wrap gap-2 p-1.5 bg-[#0a0f1d]/60 rounded-full border border-white/5 shadow-inner backdrop-blur-xl w-full xl:w-auto xl:flex-none">
              {/* Animated Tab Indicator */}
              <div 
                ref={activeTabRef}
                className="absolute top-1.5 bottom-1.5 rounded-full bg-white/10 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-0 backdrop-blur-md"
              />
              
              {[
                { id: "all", label: "All Stories", icon: IconFilter },
                { id: "engineering-note", label: "Engineering Notes", icon: IconNotes },
                { id: "case-study", label: "Project Case Studies", icon: IconRocket },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { tabRefs.current[tab.id] = el; }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`group relative z-10 flex flex-1 xl:flex-none items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.8rem] font-semibold tracking-wide transition-all duration-300 whitespace-nowrap ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon 
                      size={18} 
                      className={`transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400"
                      }`} 
                    />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Search & Filter Toggle */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 xl:gap-6 w-full xl:w-auto">
              {/* Search */}
              <div className="relative group w-full xl:w-72 flex-none">
                <IconSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400" size={20} />
                <input
                  id="blog-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Redis, Docker, Scaling..."
                  className="h-14 w-full rounded-2xl border border-white/5 bg-black/60 px-14 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-cyan-500/30 focus:ring-4 focus:ring-cyan-500/5 focus:bg-black/80"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    <IconX size={18} />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button */}
              <button 
                onClick={() => {
                  if (isTagsExpanded) {
                    setActiveTag("All");
                  }
                  setIsTagsExpanded(!isTagsExpanded);
                }}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0a0f1d]/80 px-6 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all outline-none flex-none"
              >
                <IconFilter size={16} /> 
                <span className="hidden md:inline">Tags</span>
                <IconChevronDown size={16} className={`transition-transform duration-300 ${isTagsExpanded ? "rotate-180 text-cyan-400" : ""}`} />
              </button>
            </div>
          </div>

          {/* Collapsible Tags Row */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isTagsExpanded ? "max-h-[200px] opacity-100 pt-6 border-t border-white/5 mt-2" : "max-h-0 opacity-0 pt-0 border-transparent mt-0 pointer-events-none"
          }`}>
            <div className="w-full overflow-x-auto scrollbar-hide pb-2 -mb-2">
              <div className="flex w-max gap-2 px-1">
                {["All", ...blogTags].map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`rounded-xl px-5 py-2.5 text-[0.65rem] font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                        isActive 
                          ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                          : "bg-white/5 text-slate-500 border border-transparent hover:bg-white/10 hover:text-slate-300"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <BlogListSkeleton />
        ) : visiblePosts.length > 0 ? (
          <div ref={gridRef} className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02]">
            <div className="mb-8 rounded-full bg-white/5 p-8 border border-white/5">
              <IconSearch size={56} className="text-slate-700" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No insights found</h3>
            <p className="text-slate-500 max-w-md mx-auto text-lg">
              We couldn't find any stories matching your current filters. Try refining your search.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveTab("all");
                setActiveTag("All");
              }}
              className="mt-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 px-8 py-4 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/20 transition-all active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        )}

        {canLoadMore && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 px-12 py-6 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-indigo-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative z-10">Load More Knowledge</span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogListPage;
