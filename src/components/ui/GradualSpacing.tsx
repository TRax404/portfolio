"use client";

import { cn } from "@/lib/cn";
import React, { ReactNode, ReactElement, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GradualSpacingProps {
  duration?: number;
  delayMultiple?: number;
  className?: string;
  children: ReactNode;
}

export function GradualSpacing({
  duration = 0.5,
  delayMultiple = 0.04,
  className,
  children,
}: GradualSpacingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char-item");
    
    gsap.fromTo(chars, 
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        stagger: delayMultiple,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true
        }
      }
    );
  }, { scope: containerRef });

  const renderContent = (node: ReactNode, index: number): ReactNode => {
    if (typeof node === "string") {
      return node.split("").map((char, i) => (
        <span
          key={`${index}-${i}`}
          className='inline-block char-item'
          style={{ opacity: 0 }}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </span>
      ));
    }

    if (React.isValidElement(node)) {
      const element = node as ReactElement<any>;

      return React.cloneElement(element, {
        key: index,
        children: React.Children.map(element.props.children, (child, i) => renderContent(child, index + i)),
      });
    }

    return node;
  };

  return (
    <div ref={containerRef} className={cn("flex max-w-4xl flex-wrap justify-center", className)}>
      {React.Children.map(children, renderContent)}
    </div>
  );
}
