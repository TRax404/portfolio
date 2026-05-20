"use client";
import { useRef, useEffect, useState } from "react";
import SectionTitle from "@/components/global/SectionTitle";
import projects from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/global/Container";
import Card from "./Card";
import VideoModal from "./VideoModal";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  // Reset refs on re-render to avoid stale references
  cardsRef.current = [];
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (cardsRef.current.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cardsRef.current.forEach((card, index) => {
        // The last card doesn't need to scale down
        if (index === cardsRef.current.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 15%", // When this card reaches its sticky position (top-15vh)
            endTrigger: cardsRef.current[index + 1],
            end: "top 15%", // Until the next card reaches its sticky position
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <Container id='projects' className='relative pb-32'>
      <SectionTitle text='Projects_' color='My' />
      
      {/* Wrapper for stacked cards */}
      <div className='relative w-full flex flex-col gap-[25vh] md:gap-[40vh] pt-10 pb-[20vh]'>
        {projects.map((card, idx) => (
          <div 
            ref={addToRefs} 
            key={idx} 
            // 'sticky' allows cards to stack as you scroll
            // 'top-[15vh]' sets where they stick on the screen
            className='sticky top-[10vh] md:top-[15vh] w-full md:w-[900px] mx-auto h-[400px] md:h-[450px] shadow-2xl origin-top transition-all duration-300'
          >
            <Card project={card} onPlayVideo={() => setActiveVideo(card.video_url)} />
          </div>
        ))}
      </div>

      <VideoModal videoKey={activeVideo} onClose={() => setActiveVideo(null)} />
    </Container>
  );
};

export default Projects;
