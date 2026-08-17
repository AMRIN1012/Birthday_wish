import React, { useEffect, useRef } from "react";

export default function FloatingHearts({ isCelebration = false, isDark = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const maxParticles = isCelebration ? 120 : 35;

    // Create single particle
    class Particle {
      constructor(isConfetti = false) {
        this.isConfetti = isConfetti;
        this.reset();
        // Stagger spawn heights initially
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        // If celebration confetti, spawn from top, else spawn from bottom
        this.y = this.isConfetti ? -20 : canvas.height + 20;
        this.size = Math.random() * (this.isConfetti ? 12 : 15) + (this.isConfetti ? 8 : 6);
        this.speedX = Math.random() * 1.2 - 0.6;
        this.speedY = this.isConfetti 
          ? Math.random() * 2 + 1 // falls down
          : -(Math.random() * 0.8 + 0.4); // floats up
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = Math.random() * 0.02 - 0.01;
        this.opacity = Math.random() * 0.5 + 0.4;
        
        // Colors: blush pinks, pastel red, gold sparkles
        const colors = isDark 
          ? ["#ffccd5", "#ffafcc", "#ff4d6d", "#ff85a1"] 
          : ["#ffccd5", "#ffafcc", "#ff4d6d", "#c9184a", "#ffb703"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.type = Math.random() > 0.4 ? "heart" : "sparkle";
        
        if (this.isConfetti) {
          this.type = "heart"; // Confetti are all hearts
        }
      }

      update() {
        this.x += this.speedX + Math.sin(this.angle) * 0.3;
        this.y += this.speedY;
        this.angle += this.spinSpeed;
        
        if (this.isConfetti) {
          // If confetti falls off bottom
          if (this.y > canvas.height + 20) {
            this.reset();
            this.y = -20;
          }
        } else {
          // If floating heart goes off top
          if (this.y < -20) {
            this.reset();
            this.y = canvas.height + 20;
          }
        }
        
        if (this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.type === "heart") {
          // Draw heart
          ctx.fillStyle = this.color;
          ctx.beginPath();
          const d = this.size;
          ctx.moveTo(0, -d / 4);
          ctx.bezierCurveTo(-d / 2, -d / 2 - d / 4, -d, -d / 4, -d, d / 4);
          ctx.bezierCurveTo(-d, d - d / 4, 0, d, 0, d);
          ctx.bezierCurveTo(0, d, d, d - d / 4, d, d / 4);
          ctx.bezierCurveTo(d, -d / 4, d / 2, -d / 2 - d / 4, 0, -d / 4);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw four-pointed sparkle
          ctx.fillStyle = this.color;
          ctx.beginPath();
          const s = this.size / 2;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      // Half are falling confetti if celebration mode
      const isConfetti = isCelebration && (i > maxParticles / 2);
      particles.push(new Particle(isConfetti));
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isCelebration, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="floating-hearts-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
