"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Skill } from "@/data/skills";

interface TechCardProps {
  skill: Skill;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight effect
    gsap.to(spotlightRef.current, {
      background: `radial-gradient(350px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
      duration: 0.3,
      overwrite: "auto"
    });

    // Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const degX = (y - centerY) / 10;
    const degY = (centerX - x) / 10;
    
    gsap.to(cardRef.current, {
      rotateX: degX,
      rotateY: degY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  const onMouseLeave = contextSafe(() => {
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  useGSAP(() => {
    if (!iconContainerRef.current) return;
    
    if (isHovered) {
      gsap.to(iconContainerRef.current, {
        y: -5,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto"
      });
    } else {
      gsap.to(iconContainerRef.current, {
        y: -3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        overwrite: "auto"
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 w-32 h-32 md:w-40 md:h-40 overflow-hidden cursor-pointer"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [mask-image:linear-gradient(white,white)_padding-box,linear-gradient(white,white)]" />

      {/* Mouse Reactive Spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
      />

      {/* Shine Sweep Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Floating Icon Container */}
      <div
        ref={iconContainerRef}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <img
            src={skill.logo}
            alt={skill.name}
            className="w-full h-full object-contain filter transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            loading="lazy"
          />
        </div>
        
        <span className="text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 text-center">
          {skill.name}
        </span>
      </div>

      {/* Side Label (Floating on top) */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
          {skill.side}
        </span>
      </div>

      {/* Neon Glow Bottom */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default TechCard;
