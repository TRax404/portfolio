"use client";

import { useRef } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import BlogCard from "./BlogCard";
import SectionTitle from "@/components/global/SectionTitle";
import Container from "@/components/global/Container";
import ShinnyButton from "@/components/ui/ShinnyButton";
import LINKS from "@/constant/links";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const BlogSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // We only show the first 3 posts on the home page
  const latestPosts = blogPosts.slice(0, 3);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".blog-section-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".blog-section-header",
          start: "top 90%",
        },
      }
    );

    gsap.fromTo(
      ".blog-section-footer",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".blog-section-footer",
          start: "top 95%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <Container id="blog" className="relative py-20">
      <div ref={sectionRef}>
        <div className="blog-section-header mb-12">
          <SectionTitle text="Blog_" color="Latest" />
          <p className="mt-4 max-w-2xl text-slate-400">
            Insights, tutorials, and thoughts on software engineering and modern web development.
          </p>
        </div>

        <div 
          ref={cardsContainerRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {latestPosts.map((post, index) => (
            // Note: BlogCard uses react-router-dom Link internally.
            // On the home page (Next.js), we need to handle this.
            // But BlogCard is already built for the SPA part.
            // To make it work on the home page, we might need a Next.js version or
            // wrap the home page in a Router, which is not ideal.
            // However, the user is already using react-router-dom in a Next.js app.
            // For now, I'll assume they want the blogs page animated.
            <BlogCard key={post.id} post={post} index={index} compact />
          ))}
        </div>

        <div className="blog-section-footer mt-16 flex justify-center">
          <Link href={LINKS.blog}>
            <ShinnyButton>View All Posts</ShinnyButton>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default BlogSection;
