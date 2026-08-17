import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../config/loveConfig";

export default function QuestionScreen({ onYes }) {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  const noTexts = loveConfig.noAttempts || [
    "Are you sure? 🥺",
    "Really? 😭",
    "Nice try 😌❤️"
  ];

  const handleNoInteraction = (e) => {
    // If it has reached the threshold, it becomes a YES button, so it should not flee anymore
    if (noCount >= noTexts.length) {
      handleYesClick();
      return;
    }

    // Flee! Generate random offsets in range [-120, 120] px
    const maxOffset = 120;
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset; // smaller Y range to prevent going outside screen height
    
    setNoPosition({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    // Proceed to next page after confetti burst
    setTimeout(() => {
      onYes();
    }, 1500);
  };

  // Get current text for NO button
  const getNoButtonText = () => {
    if (noCount === 0) return "NO 😏";
    if (noCount <= noTexts.length) return noTexts[noCount - 1];
    return "YES ❤️";
  };

  return (
    <div className="romantic-card" style={{ zIndex: 10 }}>
      {/* Confetti Overlay inside card */}
      {showConfetti && (
        <div 
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 100,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
            color: "var(--wine-red)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "24px"
          }}
        >
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.2, 1], opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            💖✨ Ready!
          </motion.div>
        </div>
      )}

      <h2 className="cursive-title" style={{ fontSize: "2.8rem", marginBottom: "0.5rem" }}>
        {loveConfig.questionTitle}
      </h2>
      
      {/* Decorative center image / illustration slot */}
      <div 
        style={{
          width: "150px",
          height: "150px",
          margin: "1rem 0 1.5rem",
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid var(--blush-pink)",
          boxShadow: "0 6px 12px var(--shadow-color)"
        }}
      >
        <img 
          src="/images/photo3.jpg" 
          alt="Cute illustration"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            // Fallback inside error state if photo3 doesn't load yet
            e.target.style.display = "none";
            e.target.parentNode.style.display = "flex";
            e.target.parentNode.style.alignItems = "center";
            e.target.parentNode.style.justifyContent = "center";
            e.target.parentNode.style.fontSize = "3.5rem";
            e.target.parentNode.innerHTML = "💌";
          }}
        />
      </div>

      <p className="sub-title" style={{ marginBottom: "2rem" }}>
        {loveConfig.questionText}
      </p>

      {/* Buttons layout */}
      <div className="question-buttons">
        {/* YES button */}
        <motion.button
          className="btn-primary"
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClick}
          style={{ marginTop: 0 }}
        >
          YES ❤️
        </motion.button>

        {/* NO button with Framer Motion to animate position shifts */}
        <motion.div
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="no-btn-container"
        >
          <motion.button
            className={`btn-no ${noCount >= noTexts.length ? "btn-primary" : ""}`}
            style={{ 
              marginTop: 0,
              backgroundColor: noCount >= noTexts.length ? "var(--wine-red)" : "",
              color: noCount >= noTexts.length ? "#fff" : "",
              border: noCount >= noTexts.length ? "none" : "",
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            onClick={noCount >= noTexts.length ? handleYesClick : undefined}
          >
            {getNoButtonText()}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
