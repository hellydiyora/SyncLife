import React, { useEffect, useRef } from "react";

const Confetti = ({ active, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color choices matching SyncLife theme
    const colors = [
      "#7E8F7A", // Sage
      "#9BB096", // Sage Light
      "#C38A72", // Terracotta
      "#D4A08B", // Terracotta Light
      "#E2B19C", // Gold Warm Accent
    ];

    const particleCount = 120;
    const particles = [];

    // Create particles originating from both bottom corners spraying inwards and upwards
    for (let i = 0; i < particleCount; i++) {
      const isLeft = Math.random() > 0.5;
      particles.push({
        x: isLeft ? 0 : canvas.width,
        y: canvas.height * 0.85,
        radius: Math.random() * 4 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (isLeft ? 1 : -1) * (Math.random() * 12 + 6),
        vy: -(Math.random() * 15 + 10),
        gravity: 0.45,
        drag: 0.97,
        opacity: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
      });
    }

    let startTime = Date.now();

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyVisible = false;

      particles.forEach((p) => {
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Fade out over time
        const elapsed = Date.now() - startTime;
        if (elapsed > 1200) {
          p.opacity = Math.max(0, 1 - (elapsed - 1200) / 800);
        }

        if (p.y < canvas.height && p.opacity > 0) {
          anyVisible = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Draw square/rectangle particles
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 1.5);
          ctx.restore();
        }
      });

      if (anyVisible && Date.now() - startTime < 2200) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        if (onClose) onClose();
      }
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, onClose]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default Confetti;
