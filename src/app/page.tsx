import Achievements from "@/components/sections/Achivement/Achivement";
import Projects from "@/components/sections/Project/Projects";
import DynamicBackground from "@/components/global/DynamicBackground";
import Hero from "@/components/sections/Hero/Hero";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import Experience from "@/components/sections/Experience/Experience";
import Skills from "@/components/sections/Skills/Skills";
import BlogSection from "@/components/sections/Blog/BlogSection";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tirtho Ray | Full Stack Engineer & System Designer",
  description: "Passionate Full Stack Developer specializing in React, Next.js, Node.js, and PostgreSQL. Building scalable, high-performance web applications.",
};

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tirtho Ray",
    url: "https://tirthoray.com",
    jobTitle: "Full Stack Engineer",
    sameAs: [
      "https://github.com/TRax404",
      "https://www.linkedin.com/in/tirthoray10",
      "https://www.facebook.com/tirtho.ray.935187",
    ],
    description: "Full Stack Engineer specializing in React, Next.js, Node.js, and System Design.",
  };

  return (
    <DynamicBackground>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopProgressBar />
      <Navbar />
      <Hero />
      <Suspense>
        <Skills />
      </Suspense>
      <Experience />
      <Achievements />
      <Projects />
      <BlogSection />
      <Footer />
    </DynamicBackground>
  );
}
