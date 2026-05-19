import React, { useLayoutEffect, useRef } from "react";
import useIsMobile from "@/hooks/useMobile";
import { TExperience } from "@/types/experienceTypes";
import Link from "next/link";
import Image from "next/image";

interface TimelineItemProps {
  item: TExperience;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement | null>(null);

  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    let cleanup: (() => void) | undefined;
    if (!ref.current) return;
    const el = ref.current;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = (gsapMod as any).gsap || (gsapMod as any).default || (gsapMod as any);
      const ScrollTrigger = (stMod as any).ScrollTrigger || (stMod as any).default || (stMod as any);

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      const fromX = isMobile ? 0 : isEven ? -60 : 60;
      const fromY = 40;

      gsap.set(el, { opacity: 0, x: fromX, y: fromY });

      const tween = gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      cleanup = () => tween.kill();
    })();

    return () => cleanup?.();
  }, [isEven, isMobile]);

  return (
    <div
      ref={ref}
      className={`relative lg:flex lg:justify-between z-20 gap-10 pt-20 md:pt-40 ${
        isEven ? "flex-row lg:mr-28 ml-10 lg:ml-0" : "flex-row-reverse ml-10 lg:ml-28"
      }`}
    >
      <div
        className={`group p-5 md:p-10 w-full lg:w-[50%] relative rounded-3xl
        border border-white/10 bg-slate-700/30 backdrop-blur-2xl
        shadow-xl hover:shadow-2xl transition-shadow duration-500 ${isEven ? "text-left lg:text-right" : "text-left"}`}
      >
        <div className='space-y-4'>
          {/* Header with Logo and Role */}
          <div className={`flex flex-col ${isEven ? "lg:items-end" : "items-start"} gap-4`}>
            {item.logo && (
              <div className='w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 p-2 flex items-center justify-center'>
                <Image src={item.logo} alt={item.company} width={40} height={40} className='object-contain' />
              </div>
            )}
            <h3 className='text-xl md:text-3xl font-bold text-neutral-100 tracking-tight'>{item.role}</h3>
          </div>

          {/* Company & Period */}
          <div className='space-y-1'>
            <p className='text-sm md:text-base font-medium text-sky-400'>
              {item?.website ? (
                <Link className='hover:underline decoration-sky-400 underline-offset-4' target='_blank' href={item.website}>
                  {item.company}
                </Link>
              ) : (
                item.company
              )}{" "}
              · <span className='text-neutral-400 font-normal'>{item.location}</span>
            </p>
            <p className='text-xs text-neutral-500 font-mono'>{item.period}</p>
          </div>

          {/* Tech stack */}
          <div className={`flex flex-wrap gap-2 pt-2 ${isEven ? "lg:justify-end" : "justify-start"}`}>
            {item.tech.map((tech) => (
              <span
                key={tech}
                className='text-[10px] md:text-xs rounded-full bg-slate-800/80
                border border-white/10 px-3 py-1 text-neutral-300 font-medium'
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <ul className='pt-4 space-y-3 text-sm md:text-[16px] text-neutral-300'>
            {item.highlights.map((point, i) => (
              <li key={i} className={`flex gap-3 ${isEven ? "lg:flex-row-reverse lg:text-right" : "text-left"}`}>
                <span className='mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0' />
                <span className='leading-relaxed'>{point}</span>
              </li>
            ))}
          </ul>

          {/* Key Achievement Callout */}
          {item.keyAchievement && (
            <div
              className={`mt-8 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/10 relative overflow-hidden group/achievement
              ${isEven ? "lg:text-right" : "text-left"}`}
            >
              <div
                className='absolute top-0 left-0 w-1 h-full bg-sky-500/50 rounded-full
                group-hover/achievement:h-full transition-all duration-300'
              />
              <p className='text-xs font-bold uppercase tracking-wider text-sky-400 mb-1'>Key Impact</p>
              <p className='text-sm md:text-base text-neutral-200 italic font-medium leading-relaxed'>"{item.keyAchievement}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
