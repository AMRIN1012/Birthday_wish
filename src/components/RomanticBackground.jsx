import React from "react";
import FloatingHearts from "./FloatingHearts";

export default function RomanticBackground({ isDark = false, isCelebration = false }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: isDark 
          ? "var(--bg-dark-romantic)" 
          : "var(--bg-cream)",
        transition: "background-color 1.2s ease-in-out",
        zIndex: 0,
        overflow: "hidden"
      }}
    >
      {/* Texture grain overlay */}
      <div className="paper-overlay" />
      
      {/* Floating Canvas particles */}
      <FloatingHearts isCelebration={isCelebration} isDark={isDark} />
      
      {/* Dark overlay for final letter celebration */}
      {isCelebration && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(28, 16, 21, 0.45)",
            zIndex: 1,
            pointerEvents: "none",
            transition: "opacity 1.5s ease"
          }}
        />
      )}
    </div>
  );
}
