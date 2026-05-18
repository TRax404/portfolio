"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import skills from "@/data/skills";

const InteractiveBubbleStack = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Dimensions
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Matter.js engine
    const engine = Matter.Engine.create();
    engine.gravity.y = 0; // Floating behavior
    engineRef.current = engine;

    // Matter.js render
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Boundaries (Ground, Ceiling, Walls)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Matter.Bodies.rectangle(width / 2, -50, width, 100, wallOptions), // top
      Matter.Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // bottom
      Matter.Bodies.rectangle(-50, height / 2, 100, height, wallOptions), // left
      Matter.Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions), // right
    ];

    // Bubbles
    const bubbleRadius = width < 768 ? 45 : 65;
    const bubbles = skills.map((skill) => {
      const x = Math.random() * (width - bubbleRadius * 2) + bubbleRadius;
      const y = Math.random() * (height - bubbleRadius * 2) + bubbleRadius;

      const body = Matter.Bodies.circle(x, y, bubbleRadius, {
        restitution: 0.8,
        friction: 0.001,
        frictionAir: 0.02,
        render: {
          sprite: {
            texture: skill.logo,
            xScale: (bubbleRadius * 1.5) / 100,
            yScale: (bubbleRadius * 1.5) / 100,
          },
        },
      });

      // Random initial push
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
      });

      return body;
    });

    // Mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Attraction / Repulsion Logic
    Matter.Events.on(engine, "beforeUpdate", () => {
      const mousePosition = mouse.position;
      
      bubbles.forEach((body) => {
        // Subtle floating movement
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.001,
          y: (Math.random() - 0.5) * 0.001,
        });

        // Mouse Magnetic Effect
        const dx = mousePosition.x - body.position.x;
        const dy = mousePosition.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250) {
          const forceDirection = { x: dx / distance, y: dy / distance };
          const forceStrength = (250 - distance) / 4000;
          
          Matter.Body.applyForce(body, body.position, {
            x: forceDirection.x * forceStrength,
            y: forceDirection.y * forceStrength,
          });
        }
      });
    });

    // Add to world
    Matter.World.add(engine.world, [...walls, ...bubbles, mouseConstraint]);

    // Run
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Responsive Resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;

      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: -50 });
      Matter.Body.setPosition(walls[1], { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setPosition(walls[2], { x: -50, y: newHeight / 2 });
      Matter.Body.setPosition(walls[3], { x: newWidth + 50, y: newHeight / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[700px] relative">
      <div ref={sceneRef} className="absolute inset-0 z-10" />
      
      {/* Visual background enhancements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl border border-white/5 bg-slate-950/20 backdrop-blur-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-white/[0.02]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full animate-pulse-slow" />
      </div>
    </div>
  );
};

export default InteractiveBubbleStack;
