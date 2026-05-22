"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/styles/section-title.module.css";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  color: string;
  text: string;
  lineBrak?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ color, text, lineBrak = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => setIsInView(true)
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className=' relative' style={{ opacity: 0 }}>
      <h2
        className={`${isInView ? styles.animation : ""} flex ${
          lineBrak ? "flex-col" : ""
        } gap-2 text-3xl md:text-5xl font-semibold font-montserrat bg-gradient-to-r from-white/50 via-slate-300 to-slate-600 bg-clip-text text-transparent`}
      >
        <span>{color}</span> <span className='text-slate-300'>{text}</span>
      </h2>
    </div>
  );
};

export default SectionTitle;
