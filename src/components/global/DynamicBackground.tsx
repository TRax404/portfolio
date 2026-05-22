"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function DynamicBackground({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    tl.to(containerRef.current, { backgroundColor: "#010610", duration: 0.25 })
      .to(containerRef.current, { backgroundColor: "#010610", duration: 0.25 })
      .to(containerRef.current, { backgroundColor: "#010610", duration: 0.2 })
      .to(containerRef.current, { backgroundColor: "#090946", duration: 0.1 })
      .to(containerRef.current, { backgroundColor: "#010610", duration: 0.2 });

  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
