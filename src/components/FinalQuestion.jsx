import React from "react";
import { motion } from "framer-motion";
import { loveConfig } from "../config/loveConfig";

export default function FinalQuestion({ onContinue }) {
  const heartPhotos = loveConfig.heartPhotos || [];
  const displayDate = loveConfig.specialDate || "19 • 06 • 2026";

  return (
    <div className="romantic-card" style={{ zIndex: 10, maxWidth: "440px" }}>
      <h2 className="cursive-title" style={{ fontSize: "2.8rem", marginBottom: "0.2rem" }}>
        {loveConfig.finalTitle || "Will you be mine? ❤️"}
      </h2>

      {/* Overlapping grid forming a heart shape outline */}
      <div 
        style={{
          width: "240px",
          height: "210px",
          position: "relative",
          margin: "1.2rem auto 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Photo 1: Left Lobe */}
        <motion.div
          style={{
            position: "absolute",
            width: "70px",
            height: "70px",
            left: "20px",
            top: "20px",
            background: "white",
            padding: "4px 4px 12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255, 204, 213, 0.4)",
            rotate: "-12deg",
            zIndex: 3
          }}
          whileHover={{ scale: 1.15, zIndex: 10, rotate: 0 }}
        >
          <img 
            src={heartPhotos[0] || "/images/photo1.jpg"} 
            alt="heart-1" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ffccd5%22/><text y=%22.7em%22 x=%22.15em%22 font-size=%2250%22>❤️</text></svg>"; }}
          />
        </motion.div>

        {/* Photo 2: Right Lobe */}
        <motion.div
          style={{
            position: "absolute",
            width: "70px",
            height: "70px",
            right: "20px",
            top: "20px",
            background: "white",
            padding: "4px 4px 12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255, 204, 213, 0.4)",
            rotate: "12deg",
            zIndex: 3
          }}
          whileHover={{ scale: 1.15, zIndex: 10, rotate: 0 }}
        >
          <img 
            src={heartPhotos[1] || "/images/photo2.jpg"} 
            alt="heart-2" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ffccd5%22/><text y=%22.7em%22 x=%22.15em%22 font-size=%2250%22>🧸</text></svg>"; }}
          />
        </motion.div>

        {/* Photo 3: Left Center */}
        <motion.div
          style={{
            position: "absolute",
            width: "75px",
            height: "75px",
            left: "10px",
            bottom: "45px",
            background: "white",
            padding: "4px 4px 14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255, 204, 213, 0.4)",
            rotate: "-5deg",
            zIndex: 2
          }}
          whileHover={{ scale: 1.15, zIndex: 10, rotate: 0 }}
        >
          <img 
            src={heartPhotos[2] || "/images/photo3.jpg"} 
            alt="heart-3" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ffccd5%22/><text y=%22.7em%22 x=%22.15em%22 font-size=%2250%22>✨</text></svg>"; }}
          />
        </motion.div>

        {/* Photo 4: Right Center */}
        <motion.div
          style={{
            position: "absolute",
            width: "75px",
            height: "75px",
            right: "10px",
            bottom: "45px",
            background: "white",
            padding: "4px 4px 14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255, 204, 213, 0.4)",
            rotate: "5deg",
            zIndex: 2
          }}
          whileHover={{ scale: 1.15, zIndex: 10, rotate: 0 }}
        >
          <img 
            src={heartPhotos[3] || "/images/photo4.jpg"} 
            alt="heart-4" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ffccd5%22/><text y=%22.7em%22 x=%22.15em%22 font-size=%2250%22>🌸</text></svg>"; }}
          />
        </motion.div>

        {/* Photo 5: Bottom Point */}
        <motion.div
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            bottom: "5px",
            background: "white",
            padding: "4px 4px 16px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255, 204, 213, 0.4)",
            rotate: "-2deg",
            zIndex: 4
          }}
          whileHover={{ scale: 1.15, zIndex: 10, rotate: 0 }}
        >
          <img 
            src={heartPhotos[4] || "/images/photo1.jpg"} 
            alt="heart-5" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.target.src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23ffccd5%22/><text y=%22.7em%22 x=%22.15em%22 font-size=%2250%22>🐱</text></svg>"; }}
          />
        </motion.div>

        {/* Center Sticker */}
        <div style={{ position: "absolute", zIndex: 5, fontSize: "2rem" }}>
          ❤️
        </div>
      </div>

      {/* Date */}
      <h3 style={{ fontSize: "1.2rem", fontWeight: "700", letterSpacing: "2px", color: "var(--wine-red)", margin: "0.5rem 0" }}>
        {displayDate}
      </h3>

      {/* Text Info */}
      <p style={{ fontSize: "0.95rem", fontWeight: "500", opacity: 0.85, marginTop: "0.8rem", marginBottom: "0.5rem" }}>
        {loveConfig.finalQuestionSub || "One more thing..."}
      </p>

      {/* Proceed */}
      <motion.button
        className="btn-primary"
        onClick={onContinue}
        whileTap={{ scale: 0.95 }}
      >
        {loveConfig.finalQuestionButton || "Read my final message ❤️"}
      </motion.button>
    </div>
  );
}
