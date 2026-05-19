"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
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

  // Priority skill IDs based on user request: js, ts, react, next, express, nest, postgresh, prisma, linux, docker, github action, aws, nginx
  const prioritySkillIds = [1, 2, 3, 4, 12, 13, 17, 18, 27, 21, 22, 24, 26];

  // Filter skills based on active tab and showAll state
  const filteredSkills = useMemo(() => {
    let baseSkills = activeTab === "all" ? skills : skills.filter((skill) => skill.category === activeTab);
    
    // If in "All" tab and showAll is false, only show priority skills
    if (activeTab === "all" && !showAll) {
      return baseSkills.filter((skill) => prioritySkillIds.includes(skill.id));
    }
    
    return baseSkills;
  }, [activeTab, showAll]);

  // Reset showAll when switching categories to ensure specific categories show everything
  useEffect(() => {
    if (activeTab !== "all") {
      setShowAll(true);
    }
  }, [activeTab]);

  // GSAP Infinite Marquee for all logos
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth;
    
    gsap.to(marquee, {
      x: -totalWidth / 2,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  // GSAP Scroll Animations for background elements
  useEffect(() => {
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

    gsap.to(".grid-pattern", {
      backgroundPosition: "0 100px",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 overflow-hidden bg-[#030712] font-sans"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(3,7,18,1)_100%)]" />
        
        {/* Animated Grid Pattern */}
        <div className="grid-pattern absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} 
        />
        
        {/* Blurred Glowing Orbs */}
        <div className="glow-orb absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <SectionTitle color="Tech" text="Stack" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <LargeTitle title="My Expertise" />
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
              Crafting robust digital solutions with modern technologies and industry best practices.
            </p>
          </motion.div>
        </div>

        {/* Infinite Logo Marquee */}
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
        <div className="flex flex-wrap justify-center gap-3 mb-16 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.value 
                ? "text-white" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {activeTab === tab.value && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-white/20 rounded-xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="w-full">
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <TechCard key={skill.id} skill={skill} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Show More/Less Button */}
        {activeTab === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                {showAll ? "Show Less" : "Show All"}
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↓
                </motion.span>
              </span>
            </button>
          </motion.div>
        )}

        {/* Bottom Call to Action or Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            ALWAYS LEARNING NEW TECHNOLOGIES
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Skills;
