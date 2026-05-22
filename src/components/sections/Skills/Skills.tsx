"use client";

import React, { useMemo, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import skills, { TABS, SkillCategory } from "@/data/skills";
import TechCard from "./TechCard";
import Container from "@/components/global/Container";
import SectionTitle from "@/components/global/SectionTitle";
import LargeTitle from "@/components/global/LargeTitle";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory>("all");
  const [showAll, setShowAll] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const showMoreRef = useRef<HTMLDivElement>(null);

  // Priority skill IDs - Added 31 (Redis)
  const prioritySkillIds = [1, 2, 3, 4, 12, 13, 17, 18, 31, 27, 21, 22, 24, 26];

  const filteredSkills = useMemo(() => {
    let baseSkills = activeTab === "all" ? skills : skills.filter((skill) => skill.category === activeTab);
    if (activeTab === "all" && !showAll) {
      return baseSkills.filter((skill) => prioritySkillIds.includes(skill.id));
    }
    return baseSkills;
  }, [activeTab, showAll]);

  const handleTabClick = (tab: SkillCategory) => {
    setActiveTab(tab);

    if (tab === "all") {
      setShowAll(false);
    }
  };

  useGSAP(() => {
    if (expertiseRef.current) {
      gsap.fromTo(expertiseRef.current, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  // Staggered Entrance Animation
  useGSAP(() => {
    if (!gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll(".tech-card-wrapper");
    
    // Kill any existing animations on these cards
    gsap.killTweensOf(cards);
    
    // Set initial state
    gsap.set(cards, { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,
      rotateX: -20,
      transformPerspective: 1000
    });

    // Staggered reveal
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      duration: 0.8,
      stagger: {
        amount: 0.8,
        grid: "auto",
        from: "start"
      },
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }, [filteredSkills]); 

  // GSAP Infinite Marquee
  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const totalWidth = marquee.scrollWidth;
    gsap.to(marquee, {
      x: -totalWidth / 2,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, { scope: sectionRef });

  // Background Animations
  useGSAP(() => {
    if (!sectionRef.current) return;
    const orbs = sectionRef.current.querySelectorAll(".glow-orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 2,
      });
    });
  }, { scope: sectionRef });

  // Active Tab animation
  useGSAP(() => {
    if (!activeTabRef.current || !tabsContainerRef.current) return;
    const activeBtn = tabsContainerRef.current.querySelector(`button[data-active="true"]`);
    if (activeBtn) {
      const { offsetLeft, offsetWidth, offsetHeight, offsetTop } = activeBtn as HTMLElement;
      gsap.to(activeTabRef.current, {
        left: offsetLeft,
        top: offsetTop,
        width: offsetWidth,
        height: offsetHeight,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [activeTab]);

  // Arrow rotation
  useGSAP(() => {
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotate: showAll ? 180 : 0,
        duration: 0.3
      });
    }
  }, [showAll]);

  // Show more button entrance
  useGSAP(() => {
    if (showMoreRef.current) {
      gsap.fromTo(showMoreRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }, [activeTab === "all"]);

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden bg-[#030712] font-sans"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(3,7,18,1)_100%)]" />
        <div className="grid-pattern absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} 
        />
        <div className="glow-orb absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <SectionTitle color="Tech" text="Stack" />
          <div ref={expertiseRef} style={{ opacity: 0 }}>
            <LargeTitle title="My Expertise" />
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
              Crafting robust digital solutions with modern technologies and industry best practices.
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className="w-full overflow-hidden mb-20 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030712] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030712] to-transparent z-10" />
          <div ref={marqueeRef} className="flex whitespace-nowrap gap-12 py-4 items-center">
            {[...skills, ...skills].map((skill, i) => (
              <div key={`marquee-${i}`} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-300 group cursor-default">
                <img src={skill.logo} alt={skill.name} className="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300" />
                <span className="text-xl font-bold text-white/20 group-hover:text-white transition-all duration-300 uppercase tracking-tighter">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div ref={tabsContainerRef} className="relative flex flex-wrap justify-center gap-3 mb-16 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div
            ref={activeTabRef}
            className="absolute bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-white/20 rounded-xl z-0"
            style={{ pointerEvents: 'none' }}
          />
          {TABS.map((tab) => (
            <button
              key={tab.value}
              data-active={activeTab === tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 z-10 ${
                activeTab === tab.value ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="w-full">
          <div 
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center"
          >
            {filteredSkills.map((skill, index) => (
              <div key={skill.id} className="tech-card-wrapper">
                <TechCard skill={skill} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Show More Button */}
        {activeTab === "all" && (
          <div ref={showMoreRef} className="mt-12">
            <button
              onClick={() => setShowAll((current) => !current)}
              className="group relative px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? "Show Less" : "Show All"}
                <span ref={arrowRef} className="inline-block">↓</span>
              </span>
            </button>
          </div>
        )}

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            ALWAYS LEARNING NEW TECHNOLOGIES
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Skills;
