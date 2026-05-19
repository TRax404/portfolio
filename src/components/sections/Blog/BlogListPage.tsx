"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { IconSearch, IconSparkles, IconX } from "@tabler/icons-react";
import { blogPosts, blogTags } from "@/data/blogs";
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
  const [activeTag, setActiveTag] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeTag]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      const searchable = `${post.title} ${post.excerpt} ${post.tags.join(" ")} ${getPlainContent(post.content)}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredPosts.length;

  useGSAP(() => {
    if (loading) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    );

    tl.fromTo(
      searchBarRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );
  }, [loading]);

  if (loading) {
    return <BlogListSkeleton />;
  }

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#030711] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="blog-grid-bg absolute inset-0 opacity-75" />
      <div className="blog-particles absolute inset-0" />

      <section className="relative mx-auto max-w-7xl" aria-labelledby="blog-heading">
        <div ref={headerRef} className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            <IconSparkles size={16} aria-hidden="true" />
            Engineering Journal
          </div>
          <h1 id="blog-heading" className="font-poppins text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Full Stack Notes from Real Builds
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Practical posts on systems, frontend performance, backend design, DevOps workflows, and the decisions behind production-ready software.
          </p>
        </div>

        <div
          ref={searchBarRef}
          className="mb-10 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:p-5"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block" htmlFor="blog-search">
              <span className="sr-only">Search blog posts</span>
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} aria-hidden="true" />
              <input
                id="blog-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Redis, Docker, React, JWT, PostgreSQL..."
                className="h-13 w-full rounded-xl border border-white/10 bg-black/25 px-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:bg-black/35 focus:ring-4 focus:ring-cyan-300/10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Clear search"
                >
                  <IconX size={17} aria-hidden="true" />
                </button>
              )}
            </label>

            <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max-w-[560px]" aria-label="Filter blog posts by tag">
              {["All", ...blogTags].map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={isActive ? "blog-tag blog-tag-active" : "blog-tag"}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {visiblePosts.length > 0 ? (
          <div ref={gridRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl border border-white/10 bg-white/[0.055] p-10 text-center backdrop-blur-xl"
          >
            <p className="text-xl font-bold text-white">No posts found</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Try a different search term or clear the active tag filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTag("All");
              }}
              className="mt-6 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Reset Filters
            </button>
          </div>
        )}

        {canLoadMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="rounded-full border border-white/10 bg-white/[0.075] px-7 py-3 text-sm font-bold text-white shadow-xl shadow-cyan-950/20 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              Load More Posts
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogListPage;
