import React, { useEffect, useRef } from 'react';

export const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const squares: Square[] = [];
    const numSquares = 100;
    
    class Square {
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      color: string;

      constructor() {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = Math.random() * width;
        this.size = Math.random() * 20 + 5;
        this.speed = Math.random() * 2 + 0.5;
        
        // Purple/Blue/Cyan palette
        const colors = ['#8b5cf6', '#06b6d4', '#3b82f6', '#6366f1'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.z = width;
          this.x = (Math.random() - 0.5) * width * 2;
          this.y = (Math.random() - 0.5) * height * 2;
        }
      }

      draw() {
        if (!ctx) return;
        
        const perspective = 300;
        const scale = perspective / (perspective + this.z);
        const x2d = (this.x * scale) + width / 2;
        const y2d = (this.y * scale) + height / 2;
        const size2d = this.size * scale;

        if (this.z > 0) {
          ctx.fillStyle = this.color;
          ctx.globalAlpha = Math.max(0, 1 - this.z / width); // Fade out
          ctx.fillRect(x2d, y2d, size2d, size2d);
          ctx.globalAlpha = 1;
        }
      }
    }

    for (let i = 0; i < numSquares; i++) {
      squares.push(new Square());
    }

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      squares.forEach(sq => {
        sq.update();
        sq.draw();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};
