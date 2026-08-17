import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function VirtualHug({ onContinue }) {
  const [hugged, setHugged] = useState(false);
  const [hearts, setHearts] = useState([]);

  const triggerHug = () => {
    setHugged(true);

    // Spawn 12 floating hearts around the hugging characters
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 160,
      y: -30 - Math.random() * 80,
      scale: Math.random() * 0.5 + 0.6,
      delay: Math.random() * 0.5,
    }));
    setHearts(newHearts);
  };

  return (
    <div className="romantic-card" style={{ zIndex: 10 }}>
      <h2 className="cursive-title" style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>
        {loveConfig.hugTitle}
      </h2>
      <p className="sub-title" style={{ marginBottom: "1.2rem", fontSize: "1.05rem" }}>
        {loveConfig.hugText}
      </p>

      {/* Hugging SVG Scene */}
      <div 
        style={{
          width: "280px",
          height: "180px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "1rem 0"
        }}
      >
        {/* Render Floating Hearts inside the SVG boundaries */}
        <AnimatePresence>
          {hugged && hearts.map((heart) => (
            <motion.div
              key={heart.id}
              style={{
                position: "absolute",
                color: "var(--wine-red)",
                zIndex: 5
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: heart.x,
                y: heart.y,
                opacity: [0, 1, 1, 0],
                scale: heart.scale,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.8,
                delay: heart.delay,
                ease: "easeOut"
              }}
            >
              <Heart size={20} fill="var(--wine-red)" strokeWidth={0} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Adorable Vector Characters */}
        <div style={{ display: "flex", gap: hugged ? "0px" : "40px", transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)", alignItems: "flex-end" }}>
          {/* Left Blob Character (Pink) */}
          <motion.div
            animate={hugged ? { rotate: 5, x: 12 } : { rotate: [0, -3, 3, 0], y: [0, -4, 0] }}
            transition={hugged ? { type: "spring" } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50% 50% 45% 45%",
              backgroundColor: "var(--rose-pink)",
              position: "relative",
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: "0 6px 12px var(--shadow-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Eyes */}
            <div style={{ display: "flex", gap: "10px", marginTop: "-10px" }}>
              <div style={{ width: "6px", height: "6px", backgroundColor: "var(--text-dark)", borderRadius: "50%" }} />
              <div style={{ width: "6px", height: "6px", backgroundColor: "var(--text-dark)", borderRadius: "50%" }} />
            </div>
            {/* Blushes */}
            <div style={{ position: "absolute", width: "8px", height: "4px", backgroundColor: "#ff4d6d", borderRadius: "50%", opacity: 0.6, left: "10px", top: "38px" }} />
            <div style={{ position: "absolute", width: "8px", height: "4px", backgroundColor: "#ff4d6d", borderRadius: "50%", opacity: 0.6, right: "10px", top: "38px" }} />
            {/* Smile */}
            <div style={{ position: "absolute", width: "8px", height: "4px", borderBottom: "2px solid var(--text-dark)", borderRadius: "0 0 8px 8px", top: "36px" }} />
            {/* Left Blob Arms */}
            <motion.div
              style={{
                position: "absolute",
                width: "20px",
                height: "8px",
                backgroundColor: "var(--rose-pink)",
                borderRadius: "99px",
                right: hugged ? "-10px" : "2px",
                top: "40px",
                transformOrigin: "right center"
              }}
              animate={hugged ? { rotate: -25 } : { rotate: 0 }}
            />
          </motion.div>

          {/* Right Blob Character (Peach/Cream) */}
          <motion.div
            animate={hugged ? { rotate: -5, x: -12 } : { rotate: [0, 3, -3, 0], y: [0, -4, 0] }}
            transition={hugged ? { type: "spring" } : { repeat: Infinity, duration: 3, delay: 0.5, ease: "easeInOut" }}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50% 50% 45% 45%",
              backgroundColor: "var(--blush-pink)",
              position: "relative",
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: "0 6px 12px var(--shadow-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Eyes */}
            <div style={{ display: "flex", gap: "10px", marginTop: "-10px" }}>
              <div style={{ width: "6px", height: "6px", backgroundColor: "var(--text-dark)", borderRadius: "50%" }} />
              <div style={{ width: "6px", height: "6px", backgroundColor: "var(--text-dark)", borderRadius: "50%" }} />
            </div>
            {/* Blushes */}
            <div style={{ position: "absolute", width: "8px", height: "4px", backgroundColor: "#ff4d6d", borderRadius: "50%", opacity: 0.6, left: "10px", top: "38px" }} />
            <div style={{ position: "absolute", width: "8px", height: "4px", backgroundColor: "#ff4d6d", borderRadius: "50%", opacity: 0.6, right: "10px", top: "38px" }} />
            {/* Smile */}
            <div style={{ position: "absolute", width: "8px", height: "4px", borderBottom: "2px solid var(--text-dark)", borderRadius: "0 0 8px 8px", top: "36px" }} />
            {/* Right Blob Arms */}
            <motion.div
              style={{
                position: "absolute",
                width: "20px",
                height: "8px",
                backgroundColor: "var(--blush-pink)",
                borderRadius: "99px",
                left: hugged ? "-10px" : "2px",
                top: "40px",
                transformOrigin: "left center"
              }}
              animate={hugged ? { rotate: 25 } : { rotate: 0 }}
            />
          </motion.div>
        </div>
      </div>

      {/* MISS YOU / Feedback */}
      <h3 style={{ fontSize: "1.6rem", color: "var(--wine-red)", margin: "0.8rem 0 1rem" }}>
        {hugged ? loveConfig.hugSuccess : loveConfig.hugSub}
      </h3>

      {/* Button controls */}
      {!hugged ? (
        <motion.button
          className="btn-primary"
          whileTap={{ scale: 0.95 }}
          onClick={triggerHug}
        >
          {loveConfig.hugButton}
        </motion.button>
      ) : (
        <motion.button
          className="btn-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onContinue}
        >
          Continue →
        </motion.button>
      )}
    </div>
  );
}
