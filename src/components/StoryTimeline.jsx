import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function StoryTimeline({ onContinue }) {
  const storyText = loveConfig.storyText || "";

  return (
    <div 
      className="romantic-card" 
      style={{ 
        maxWidth: "460px", 
        width: "95%", 
        padding: "2.5rem 1.8rem", 
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)"
      }}
    >
      <h2 className="cursive-title" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
        {loveConfig.storyTitle}
      </h2>

      {/* Heart scale beating decoration */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ marginBottom: "1.2rem", color: "var(--wine-red)", display: "flex", justifyContent: "center" }}
      >
        <Heart size={28} fill="var(--wine-red)" strokeWidth={0} />
      </motion.div>

      {/* Story Text Display */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          padding: "0.5rem 0.2rem",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}
      >
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.75",
            fontWeight: "500",
            color: "var(--text-dark)",
            opacity: 0.9
          }}
        >
          {storyText}
        </p>
      </motion.div>

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

