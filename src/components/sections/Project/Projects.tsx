"use client";
import { useRef, useEffect, useState } from "react";
import SectionTitle from "@/components/global/SectionTitle";
import projects from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/global/Container";
import Card from "./Card";
import VideoModal from "./VideoModal";
import Link from "next/link";
import ShinnyButton from "@/components/ui/ShinnyButton";
import ImagePreviewModal from "./ImagePreviewModal";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const overlaysRef = useRef<HTMLDivElement[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImages, setActiveImages] = useState<{ images: string[]; name: string } | null>(null);
  
  // Reset refs on re-render to avoid stale references
  cardsRef.current = [];
  overlaysRef.current = [];
  
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToOverlays = (el: HTMLDivElement | null) => {
    if (el && !overlaysRef.current.includes(el)) {
      overlaysRef.current.push(el);
    }
  };

  useEffect(() => {
    if (cardsRef.current.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      cardsRef.current.forEach((card, index) => {
        // The last card doesn't need to scale down
        if (index === cardsRef.current.length - 1) return;

        const overlay = overlaysRef.current[index];

        // Animate the card scale
        gsap.to(card, {
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 12%", // Match the top-[12vh] sticky position
            endTrigger: cardsRef.current[index + 1],
            end: "top 12%", // Until the next card reaches its sticky position
            scrub: true,
          },
        });

        // Animate the overlay opacity to darken the card instead of making it translucent
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 12%",
              endTrigger: cardsRef.current[index + 1],
              end: "top 12%",
              scrub: true,
            },
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <Container id='projects' className='relative pb-32'>
      <SectionTitle text='Projects_' color='My' />
      
      {/* Wrapper for stacked cards */}
      <div className='relative w-full flex flex-col gap-[25vh] md:gap-[40vh] pt-10 pb-[10vh]'>
        {projects.slice(0, 4).map((card, idx) => (
          <div 
            ref={addToRefs} 
            key={idx} 
            // 'sticky' allows cards to stack as you scroll
            // Note: REMOVED `transition-all duration-300` to fix GSAP scrub jank!
            className='sticky top-[12vh] w-full md:w-[900px] mx-auto h-[400px] md:h-[450px] shadow-2xl origin-top'
            style={{ zIndex: idx }}
          >
            <Card 
              project={card} 
              priority={idx < 2}
              onPlayVideo={() => setActiveVideo(card.video_url || null)} 
              onPreviewImages={() => card.images && setActiveImages({ images: card.images, name: card.project_name })}
            />
            {/* Dark overlay for GSAP dimming effect */}
            <div 
              ref={addToOverlays} 
              className="absolute inset-0 bg-black rounded-2xl opacity-0 pointer-events-none z-50"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/projects">
          <ShinnyButton className="px-8 py-3 text-sm tracking-widest font-semibold">VIEW ALL PROJECTS</ShinnyButton>
        </Link>
      </div>

      <VideoModal videoKey={activeVideo} onClose={() => setActiveVideo(null)} />
      <ImagePreviewModal 
        isOpen={!!activeImages} 
        images={activeImages?.images} 
        projectName={activeImages?.name} 
        onClose={() => setActiveImages(null)} 
      />
    </Container>
  );
};

export default Projects;
