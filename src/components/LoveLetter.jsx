import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function LoveLetter({ onReplay, onLetterOpened }) {
  const [isOpen, setIsOpen] = useState(false);

  // Replace placeholders dynamically with config values
  const rawLetterText = loveConfig.loveLetterText || "";
  const letterText = rawLetterText
    .replace(/\[NAME\]/g, loveConfig.recipientName)
    .replace(/\[YOUR NAME\]/g, loveConfig.senderName)
    .replace(/\[YOUR_NAME\]/g, loveConfig.senderName);

  const handleOpenLetter = () => {
    setIsOpen(true);
    // Tell parent component that the letter has opened, to trigger dark background and heavy hearts
    onLetterOpened();
    setTimeout(() => {
      const section = document.querySelector(".story-section");
      if (section) section.scrollTop = 0;
    }, 50);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "1rem 0 2rem 0",
        zIndex: 10
      }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Envelope Mode */
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="romantic-card"
            style={{
              cursor: "pointer",
              backgroundColor: "var(--pastel-pink)",
              border: "2px dashed var(--blush-pink)"
            }}
            onClick={handleOpenLetter}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(140, 80, 90, 0.08)",
                  marginBottom: "1rem"
                }}
              >
                <Mail size={40} color="var(--wine-red)" />
              </div>

              <h2 className="cursive-title" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                {loveConfig.loveLetterTitle}
              </h2>

              <p style={{ fontSize: "0.95rem", fontWeight: "600", opacity: 0.8, color: "var(--wine-red)" }}>
                Tap to open your letter ✉️
              </p>

              {/* Cute wax seal heart */}
              <motion.div
                style={{ marginTop: "1.5rem" }}
                whileHover={{ scale: 1.2 }}
              >
                <Heart size={32} fill="var(--wine-red)" strokeWidth={0} />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          /* Letter Mode & Celebration Mode */
          <motion.div
            key="letter"
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 15 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "480px"
            }}
          >
            {/* The Notebook Paper Letter */}
            <div className="diary-letter" style={{ marginBottom: "2rem" }}>
              {/* Notebook binding margin decoration */}
              <div
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "0",
                  bottom: "0",
                  width: "1px",
                  backgroundColor: "rgba(255, 175, 204, 0.5)",
                  zIndex: 2
                }}
              />
              <div className="diary-letter-lines">
                {letterText}
              </div>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end", fontFamily: "var(--font-cursive)", fontSize: "1.4rem", color: "var(--wine-red)" }}>
                Made with all my heart ❤️
              </div>
            </div>

            {/* Celebratory message area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{
                textAlign: "center",
                color: "#ffffff", // Stands out beautifully against darkened backdrop
                zIndex: 10,
                padding: "0 1.5rem 2rem",
                width: "100%"
              }}
            >
              <h2
                className="cursive-title"
                style={{
                  color: "#fff",
                  fontSize: "3.2rem",
                  textShadow: "0 4px 15px rgba(255, 175, 204, 0.4)",
                  marginBottom: "0.5rem"
                }}
              >
                {loveConfig.celebrationText}
              </h2>

              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  opacity: 0.95,
                  marginBottom: "1.8rem",
                  lineHeight: "1.6",
                  color: "var(--blush-pink)"
                }}
              >
                {loveConfig.celebrationSub}
              </p>

              {/* Replay Button */}
              <motion.button
                className="btn-primary"
                whileTap={{ scale: 0.95 }}
                onClick={onReplay}
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--wine-red)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)"
                }}
              >
                Replay Our Story ❤️
              </motion.button>

              {/* Sender Tag */}
              <p
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.75,
                  marginTop: "1.5rem",
                  fontStyle: "italic",
                  color: "var(--blush-pink)"
                }}
              >
                Made with ❤️ by {loveConfig.senderName}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
