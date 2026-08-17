import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Delete } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function PasscodeScreen({ onUnlock }) {
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const SECRET_CODE = loveConfig.secretCode || "1234";

  // Trigger error or success logic when code reaches length of secret code
  useEffect(() => {
    if (code.length === SECRET_CODE.length) {
      if (code === SECRET_CODE) {
        setErrorMsg("");
        setSuccessMsg(loveConfig.passcodeSuccess || "Unlocked! ❤️");
        // Proceed to next section after a slight delay to allow correct feedback
        const timer = setTimeout(() => {
          onUnlock();
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Trigger shaking error animation
        setIsShaking(true);
        setErrorMsg(loveConfig.passcodeError || "Oops... that's not our secret 🤭");
        
        const timer = setTimeout(() => {
          setIsShaking(false);
          setCode("");
        }, 800);
        return () => clearTimeout(timer);
      }
    } else {
      // Clear warnings as soon as they type a new key
      if (errorMsg) {
        setErrorMsg("");
      }
    }
  }, [code, SECRET_CODE, onUnlock, errorMsg]);

  const handleKeyPress = (num) => {
    if (code.length < SECRET_CODE.length && !successMsg) {
      setCode((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    if (code.length > 0 && !successMsg) {
      setCode((prev) => prev.slice(0, -1));
    }
  };

  // Create numeric buttons list
  const keypadNumbers = [
    { type: "num", label: "1" },
    { type: "num", label: "2" },
    { type: "num", label: "3" },
    { type: "num", label: "4" },
    { type: "num", label: "5" },
    { type: "num", label: "6" },
    { type: "num", label: "7" },
    { type: "num", label: "8" },
    { type: "num", label: "9" },
    { type: "deco", label: "❤️" },
    { type: "num", label: "0" },
    { type: "back", label: "⌫" },
  ];

  return (
    <div className="romantic-card" style={{ zIndex: 10 }}>
      <h2 className="cursive-title" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        {loveConfig.passcodeTitle}
      </h2>
      <p className="sub-title" style={{ marginBottom: "1rem" }}>
        {loveConfig.passcodeSubtitle}
      </p>

      {/* Shaking Passcode Dots */}
      <motion.div
        className="passcode-indicators"
        animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: SECRET_CODE.length }).map((_, idx) => (
          <div
            key={idx}
            className={`indicator-dot ${idx < code.length ? "active" : ""}`}
          >
            <Heart
              size={24}
              fill={idx < code.length ? "var(--wine-red)" : "none"}
              strokeWidth={idx < code.length ? 0 : 2}
            />
          </div>
        ))}
      </motion.div>

      {/* Keypad */}
      <div className="keypad-grid">
        {keypadNumbers.map((btn, index) => {
          if (btn.type === "num") {
            return (
              <motion.button
                key={index}
                className="keypad-btn"
                whileTap={{ scale: 0.9 }}
                onClick={() => handleKeyPress(btn.label)}
              >
                {btn.label}
              </motion.button>
            );
          } else if (btn.type === "deco") {
            return (
              <div
                key={index}
                className="keypad-btn keypad-btn-action"
                style={{ background: "transparent", border: "none", cursor: "default", boxShadow: "none" }}
              >
                ❤️
              </div>
            );
          } else {
            return (
              <motion.button
                key={index}
                className="keypad-btn keypad-btn-action"
                whileTap={{ scale: 0.9 }}
                onClick={handleBackspace}
              >
                <Delete size={20} />
              </motion.button>
            );
          }
        })}
      </div>

      {/* Error/Success Feedbacks */}
      <div style={{ height: "24px", marginTop: "0.5rem" }}>
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ color: "#e63946", fontSize: "0.95rem", fontWeight: "600" }}
            >
              {errorMsg}
            </motion.p>
          )}
          {successMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "green", fontSize: "1.05rem", fontWeight: "700" }}
            >
              {successMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
