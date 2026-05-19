"use client";

import { useRef } from "react";
import { IconArrowLeft, IconCalendar, IconClock, IconTag } from "@tabler/icons-react";
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

  const headerRef = useRef<HTMLElement>(null);
  const backBtnRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!post) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      backBtnRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6 }
    );

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    );

    if (relatedRef.current) {
      gsap.fromTo(
        relatedRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030711] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="blog-grid-bg absolute inset-0 opacity-75" />
      <div className="blog-particles absolute inset-0" />

      <article className="relative mx-auto max-w-5xl">
        <div ref={backBtnRef}>
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
          >
            <IconArrowLeft size={18} aria-hidden="true" />
            Back to Blogs
          </Link>
        </div>

        <header
          ref={headerRef}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
        >
          <div className="relative h-[340px] overflow-hidden md:h-[460px]">
            <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/38 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="mb-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md">
                    <IconTag size={14} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl font-poppins text-3xl font-black leading-tight text-white md:text-5xl">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 px-6 py-5 text-sm font-medium text-slate-300 md:px-10">
            <span className="inline-flex items-center gap-2">
              <IconCalendar size={18} aria-hidden="true" />
              {formatBlogDate(post.createdAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <IconClock size={18} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div
          ref={contentRef}
          className="blog-prose mt-10 rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-cyan-950/15 backdrop-blur-xl md:p-10"
        >
          <p className="lead">{post.excerpt}</p>

          {post.content.map((block, index) => {
            if (block.type === "heading") {
              return <h2 key={index}>{block.body}</h2>;
            }

            if (block.type === "paragraph") {
              return <p key={index}>{block.body}</p>;
            }

            if (block.type === "list") {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "quote") {
              return <blockquote key={index}>{block.body}</blockquote>;
            }

            return (
              <div key={index} className="code-frame">
                <div className="code-frame-bar">
                  <span />
                  <span />
                  <span />
                  <strong>{block.language}</strong>
                </div>
                <pre>
                  <code>{block.body}</code>
                </pre>
              </div>
            );
          })}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section ref={relatedRef} className="relative mx-auto mt-16 max-w-7xl" aria-labelledby="related-posts-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Keep Reading</p>
              <h2 id="related-posts-heading" className="mt-2 font-poppins text-2xl font-black text-white md:text-3xl">
                Related Engineering Posts
              </h2>
            </div>
            <Link to="/" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-white md:inline-flex">
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost, index) => (
              <BlogCard key={relatedPost.id} post={relatedPost} index={index} compact />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetailPage;
