import React from "react";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function BirthdayScreen({ onContinue }) {
  const photo = loveConfig.birthdayPhoto || "/images/photo1.png";
  const date = loveConfig.birthdayDate || loveConfig.specialDate || "19 • 06 • 2026";
  const messageLines = loveConfig.messageLines || [];

  // Title character animation variants
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      rotate: 0 
    },
    show: (custom) => ({
      opacity: 1,
      y: custom.targetY,
      rotate: custom.targetRotate,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const messageLinesContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.7,
        staggerChildren: 0.6,
      }
    }
  };

  const messageLineItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="romantic-card" style={{ maxWidth: "460px" }}>
      {/* Gentle Curved HAPPY BIRTHDAY Title */}
      <motion.div
        variants={titleContainerVariants}
        initial="hidden"
        animate="show"
        className="curved-title-container"
      >
        <div className="curved-word">
          {["H", "A", "P", "P", "Y"].map((char, idx) => {
            const diff = idx - 2;
            const targetRotate = diff * 7;
            const targetY = Math.pow(diff, 2) * 2.5;
            return (
              <motion.span
                key={`h-${idx}`}
                variants={letterVariants}
                custom={{ targetY, targetRotate }}
                className="curved-letter"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
        <div className="curved-word" style={{ marginTop: "0.3rem" }}>
          {["B", "I", "R", "T", "H", "D", "A", "Y"].map((char, idx) => {
            const diff = idx - 3.5;
            const targetRotate = diff * 6;
            const targetY = Math.pow(diff, 2) * 2;
            return (
              <motion.span
                key={`b-${idx}`}
                variants={letterVariants}
                custom={{ targetY, targetRotate }}
                className="curved-letter"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </motion.div>

      {/* Birthday Date Badge */}
      <motion.div
        className="birthday-date-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
      >
        <Calendar size={18} strokeWidth={2.2} />
        <span>{date}</span>
      </motion.div>

      {/* Polaroid Framed Birthday Photo */}
      <motion.div
        className="birthday-photo-card"
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 180 }}
        whileHover={{ scale: 1.03, rotate: 0 }}
      >
        {/* Heart Pin Decor */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "calc(50% - 13px)",
            zIndex: 4,
            transform: "rotate(-5deg)"
          }}
        >
          <Heart size={26} fill="#ffafcc" strokeWidth={0} />
        </div>

        <div className="birthday-photo-wrapper">
          <img
            src={photo}
            alt="Happy Birthday"
            className="birthday-photo"
            onError={(e) => {
              e.target.style.display = "none";
              if (e.target.parentNode) {
                e.target.parentNode.style.display = "flex";
                e.target.parentNode.style.alignItems = "center";
                e.target.parentNode.style.justifyContent = "center";
                e.target.parentNode.style.backgroundColor = "var(--pastel-pink)";
                e.target.parentNode.style.fontSize = "3.5rem";
                e.target.parentNode.innerHTML = "🎂";
              }
            }}
          />
        </div>
      </motion.div>

      {/* Staggered text lines */}
      {messageLines.length > 0 && (
        <motion.div 
          variants={messageLinesContainer}
          initial="hidden"
          animate="show"
          style={{ display: "flex", flexDirection: "column", gap: "0.8rem", margin: "0.5rem 0 1.5rem", textAlign: "center" }}
        >
          {messageLines.map((line, idx) => (
            <motion.p 
              key={idx} 
              variants={messageLineItem}
              style={{ fontSize: "1.05rem", lineHeight: "1.5", fontWeight: "500", opacity: 0.9 }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      )}

      {/* Continue Button */}
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
