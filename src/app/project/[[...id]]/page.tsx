import type { Metadata } from "next";
import DynamicBackground from "@/components/global/DynamicBackground";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import ProjectRouter from "@/components/sections/Project/ProjectRouter";
import projects from "@/data/projects";

type Props = {
  params: Promise<{ id?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id?.[0];
  const project = projects.find((p) => String(p.id) === id || p.slug === id);

  if (!project) {
    return {
      title: "Project Not Found | Tirtho Deb Ray",
    };
  }

  return {
    title: project.project_name,
    description: project.description,
    openGraph: {
      title: `${project.project_name} | Tirtho Deb Ray`,
      description: project.description,
      images: project.project_thumnail ? [{ url: project.project_thumnail }] : [],
    },
  };
}

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