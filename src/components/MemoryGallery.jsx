import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function MemoryGallery({ onContinue }) {
  const scrollRef = useRef(null);

  // Retrieve memories from configuration file
  const memories = loveConfig.memories || [];

  return (
    <div 
      className="romantic-card" 
      style={{ 
        maxWidth: "600px", 
        width: "95%", 
        padding: "2rem 1rem", 
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)"
      }}
    >
      <h2 className="cursive-title" style={{ fontSize: "2.8rem", marginBottom: "0.2rem" }}>
        {loveConfig.memoriesTitle}
      </h2>
      <p style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.8rem" }}>
        📸 Drag or swipe left/right to view all our memories
      </p>

      {/* Draggable/scrollable viewport container */}
      <div 
        ref={scrollRef}
        className="memories-container"
        style={{
          width: "100%",
          display: "flex",
          gap: "1.2rem",
          overflowX: "auto",
          padding: "1rem 0.5rem 2rem",
          cursor: "grab"
        }}
      >
        {memories.map((item, index) => {
          // Calculate random tilts to feel like real scattered photographs
          const rotationAngle = index % 2 === 0 ? -3 - (index % 3) : 2 + (index % 4);

          return (
            <motion.div
              key={index}
              className="polaroid-card"
              style={{
                rotate: rotationAngle
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                y: -10,
                zIndex: 20,
                boxShadow: "0 15px 35px rgba(140, 80, 90, 0.25)"
              }}
              whileTap={{ 
                scale: 1.05, 
                rotate: 0,
                y: -10,
                zIndex: 20
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Cute heart sticker on polaroids */}
              <div 
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "calc(50% - 12px)",
                  zIndex: 3,
                  transform: "rotate(-10deg)"
                }}
              >
                <Heart size={24} fill="#ffafcc" strokeWidth={0} />
              </div>

              {/* Photo Box */}
              <div className="polaroid-image-wrapper">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="polaroid-image"
                  onError={(e) => {
                    // Generates inline beautiful vector placeholder if actual image path fails or isn't placed yet
                    e.target.style.display = "none";
                    e.target.parentNode.style.display = "flex";
                    e.target.parentNode.style.alignItems = "center";
                    e.target.parentNode.style.justifyContent = "center";
                    e.target.parentNode.style.backgroundColor = "var(--pastel-pink)";
                    e.target.parentNode.style.fontSize = "3rem";
                    e.target.parentNode.innerHTML = "🌸";
                  }}
                />
              </div>

              {/* Caption */}
              <div className="polaroid-caption">
                {item.caption}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        className="btn-primary"
        onClick={onContinue}
        whileTap={{ scale: 0.95 }}
      >
        Continue →
      </motion.button>
    </div>
  );
}
