import type { Metadata } from "next";
import DynamicBackground from "@/components/global/DynamicBackground";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import BlogRouter from "@/components/sections/Blog/BlogRouter";

export const metadata: Metadata = {
  title: "Engineering Blog | Tirtho Ray",
  description: "Engineering notes on full-stack development, performance, architecture, DevOps, and real-world implementation decisions.",
  openGraph: {
    title: "Engineering Blog | Tirtho Ray",
    description: "Full-stack engineering posts about React, Node.js, Redis, PostgreSQL, Docker, DevOps, and architecture.",
    type: "website",
  },
};

export default function BlogsPage() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Navbar />
      <BlogRouter />
      <Footer />
    </DynamicBackground>
  );
}
