"use client";

import { useEffect, useRef } from "react";
import styles from "./TechBackground.module.css";

const PARTICLE_COUNT = 80;
const LINE_COUNT = 40;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  baseOpacity: number;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    size: Math.random() * 1.5 + 0.5,
    baseOpacity: Math.random() * 0.4 + 0.1,
    opacity: 0,
  };
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const linesCanvas = linesRef.current;
    if (!canvas || !linesCanvas) return;

    const ctx = canvas.getContext("2d");
    const linesCtx = linesCanvas.getContext("2d");
    if (!ctx || !linesCtx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      linesCanvas.width = width;
      linesCanvas.height = height;
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from(
          { length: PARTICLE_COUNT },
          () => createParticle(width, height)
        );
      }
    };

    setSize();
    window.addEventListener("resize", setSize);

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      timeRef.current += 0.016;

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        const opacity =
          p.baseOpacity * (0.7 + 0.3 * Math.sin(timeRef.current + p.x * 0.01));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
        ctx.fill();
      });
    };

    const drawLines = () => {
      linesCtx.clearRect(0, 0, width, height);
      const t = timeRef.current * 0.3;
      const spacing = width / (LINE_COUNT + 1);

      for (let i = 1; i <= LINE_COUNT; i++) {
        const x = spacing * i;
        const opacity = 0.03 + 0.02 * Math.sin(t + i * 0.5);
        linesCtx.strokeStyle = `rgba(34, 197, 94, ${opacity})`;
        linesCtx.lineWidth = 1;
        linesCtx.beginPath();
        linesCtx.moveTo(x, 0);
        linesCtx.lineTo(x, height);
        linesCtx.stroke();
      }
    };

    const tick = () => {
      drawParticles();
      drawLines();
      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden>
      <div className={styles.gradient} />
      <div className={styles.glow} />
      <canvas
        ref={linesRef}
        className={styles.canvas}
        width={typeof window !== "undefined" ? window.innerWidth : 1920}
        height={typeof window !== "undefined" ? window.innerHeight : 1080}
      />
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={typeof window !== "undefined" ? window.innerWidth : 1920}
        height={typeof window !== "undefined" ? window.innerHeight : 1080}
      />
    </div>
  );
}
