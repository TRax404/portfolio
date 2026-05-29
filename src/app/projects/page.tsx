import type { Metadata } from "next";
import ProjectsClient from "@/components/sections/Project/ProjectsClient";
import DynamicBackground from "@/components/global/DynamicBackground";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";

export const metadata: Metadata = {
  title: "Projects Showcase | Tirtho Ray",
  description: "A collection of my work, featuring real-world applications, tools, and platforms built with modern web technologies.",
  openGraph: {
    title: "Projects Showcase | Tirtho Ray",
    description: "Explore my portfolio of full-stack projects, from enterprise SaaS platforms to open-source tools.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Navbar />
      <ProjectsClient />
      <Footer />
    </DynamicBackground>
  );
}
