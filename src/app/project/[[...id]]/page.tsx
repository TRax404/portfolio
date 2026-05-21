import type { Metadata } from "next";
import DynamicBackground from "@/components/global/DynamicBackground";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import ProjectRouter from "@/components/sections/Project/ProjectRouter";

export const metadata: Metadata = {
  title: "Project Infrastructure | Tirtho Ray",
  description: "Detailed infrastructure and technical implementation of the project.",
};

export default function ProjectDetailsPage() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Navbar />
      <ProjectRouter />
      <Footer />
    </DynamicBackground>
  );
}
