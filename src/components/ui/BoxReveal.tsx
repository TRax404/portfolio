"use client";
import { JSX, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  duration?: number;
  overflow?: "visible" | "hidden";
  viewportAnimate?: boolean;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  duration = 0.6,
  overflow = "hidden",
  viewportAnimate = true,
}: BoxRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (viewportAnimate) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration, 
          ease: "power2.out", 
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    } else {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration, 
          ease: "power2.out", 
          delay: 0.2 
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      style={{ position: "relative", width, overflow, opacity: 0 }}
    >
      {children}
    </div>
  );
};

export default BoxReveal;
