"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

export const FlipWords = ({ words, duration = 3000, className }: { words: string[]; duration?: number; className?: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const wordsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!wordsRef.current) return;

    const chars = wordsRef.current.querySelectorAll(".char");

    // Entrance animation
    const tl = gsap.timeline();

    tl.set(wordsRef.current, { opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1, position: "relative" });

    tl.fromTo(chars,
      { opacity: 0, y: 10, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(2)",
      }
    );

    // Schedule exit
    const timer = setTimeout(() => {
      gsap.to(wordsRef.current, {
        opacity: 0,
        y: -40,
        x: 40,
        filter: "blur(8px)",
        scale: 2,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [currentWordIndex, words, duration]);

  const currentWord = words[currentWordIndex];


  return (
    <div
      className={cn("z-10 inline-block relative text-center text-sky-400 font-bold font-montserrat px-2 w-[200px]", className)}
    >
      <div ref={wordsRef} className="inline-block">
        {currentWord.split(" ").map((word, wordIndex) => (
          <span key={word + wordIndex} className='inline-block whitespace-nowrap'>
            {word.split("").map((letter, letterIndex) => (
              <span
                key={word + letterIndex}
                className='inline-block char'
              >
                {letter}
              </span>
            ))}
            <span className='inline-block'>&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FlipWords;
