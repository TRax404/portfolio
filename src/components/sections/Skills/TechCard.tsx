"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { Skill } from "@/data/skills";

interface TechCardProps {
  skill: Skill;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse reactive spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Smooth springs for tilt effect
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const onMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const degX = (y - centerY) / 10;
    const degY = (centerX - x) / 10;
    rotateX.set(degX);
    rotateY.set(degY);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100 
      }}
      onMouseMove={(e) => {
        handleMouseMove(e);
        onMouseMoveTilt(e);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 w-32 h-32 md:w-40 md:h-40 overflow-hidden cursor-pointer"
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [mask-image:linear-gradient(white,white)_padding-box,linear-gradient(white,white)]" />

      {/* Mouse Reactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Shine Sweep Effect */}
      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Floating Icon Container */}
      <motion.div
        animate={isHovered ? { y: -5 } : { y: [0, -3, 0] }}
        transition={isHovered ? { duration: 0.2 } : { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={skill.logo}
            alt={skill.name}
            fill
            className="object-contain filter transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          />
        </div>
        
        <span className="text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300 text-center">
          {skill.name}
        </span>
      </motion.div>

      {/* Side Label (Floating on top) */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
          {skill.side}
        </span>
      </div>

      {/* Neon Glow Bottom */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default TechCard;
