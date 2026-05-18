"use client";

import React from "react";
import skills from "@/data/skills";

const Marquee = () => {
  // Duplicate skills to create a seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="relative flex overflow-hidden py-20 select-none w-full">
      <div className="animate-marquee">
        {duplicatedSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 py-4 mx-4 glass-card rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
          >
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <span className="text-white font-montserrat font-medium whitespace-nowrap text-sm md:text-base">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
