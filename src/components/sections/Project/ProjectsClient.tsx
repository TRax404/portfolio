"use client";

import { useState } from "react";
import projects from "@/data/projects";
import Card from "@/components/sections/Project/Card";
import VideoModal from "@/components/sections/Project/VideoModal";
import { IconSparkles } from "@tabler/icons-react";
import ImagePreviewModal from "@/components/sections/Project/ImagePreviewModal";

export default function ProjectsClient() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<{ images: string[]; name: string } | null>(null);

  return (
    <main className="relative min-h-screen bg-[#030712] px-4 py-32 text-white sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-indigo-500/10 blur-[140px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-4xl text-center mt-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-cyan-400">
            <IconSparkles size={16} />
            Showcase
          </div>
          <h1 className="font-poppins text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            All <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            A complete collection of my work, featuring real-world applications, tools, and platforms built with modern web technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-14">
          {projects.map((project, idx) => (
            <div key={idx} className="h-[420px] md:h-[550px] w-full max-w-[550px] mx-auto">
              <Card 
                project={project} 
                priority={idx < 4}
                onPlayVideo={() => setActiveVideo(project.video_url || null)} 
                onPreviewImages={() => project.images && setActiveImages({ images: project.images, name: project.project_name })}
                variant="vertical" 
              />
            </div>
          ))}
        </div>
      </section>

      <VideoModal videoKey={activeVideo} onClose={() => setActiveVideo(null)} />
      <ImagePreviewModal 
        isOpen={!!activeImages} 
        images={activeImages?.images} 
        projectName={activeImages?.name} 
        onClose={() => setActiveImages(null)} 
      />
    </main>
  );
}

