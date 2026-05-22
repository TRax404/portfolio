"use client";
import { useRef } from "react";
import styles from "@/styles/progressbar.module.css";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TopProgressBar = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  });

  return (
    <>
      <div
        ref={progressBarRef}
        className={cn(styles.progressBar)}
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />
    </>
  );
};

export default TopProgressBar;
