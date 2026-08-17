import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../config/loveConfig";
import RomanticBackground from "./RomanticBackground";
import MusicController from "./MusicController";
import ProgressIndicator from "./ProgressIndicator";

// Import individual page components
import PasscodeScreen from "./PasscodeScreen";
import QuestionScreen from "./QuestionScreen";
import MemoryGallery from "./MemoryGallery";
import BirthdayScreen from "./BirthdayScreen";
import StoryTimeline from "./StoryTimeline";
import LoveLetter from "./LoveLetter";

export default function StoryExperience() {
  const [currentSection, setCurrentSection] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [maxSectionUnlocked, setMaxSectionUnlocked] = useState(3); // Start locked at passcode (Sec 3)
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCelebration, setIsCelebration] = useState(false);

  // Swipe detection coordinates
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key events if typing in passcode input (though we use custom keypad buttons)
      if (e.key === "ArrowRight" || e.key === "Right") {
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "Left") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, maxSectionUnlocked]);

  // Navigate forward
  const handleNext = () => {
    if (currentSection < 8 && currentSection < maxSectionUnlocked) {
      setDirection(1);
      setCurrentSection((prev) => prev + 1);
    }
  };

  // Navigate backward
  const handlePrev = () => {
    if (currentSection > 1) {
      setDirection(-1);
      setCurrentSection((prev) => prev - 1);
    }
  };

  // Custom navigation from progress dots
  const handleSectionJump = (sectionNum) => {
    if (sectionNum <= maxSectionUnlocked) {
      setDirection(sectionNum > currentSection ? 1 : -1);
      setCurrentSection(sectionNum);
    }
  };

  // Triggers when "Open it ♥" clicked
  const handleStartExperience = () => {
    setHasInteracted(true);
    setIsPlaying(true);
    setDirection(1);
    setCurrentSection(2);
  };

  // Triggers on correct passcode
  const handlePasscodeUnlock = () => {
    setMaxSectionUnlocked(4);
    setDirection(1);
    setCurrentSection(4);
  };

  // Triggers on YES selected
  const handleQuestionYes = () => {
    setMaxSectionUnlocked(8); // Unlock all 8 subsequent steps
    setDirection(1);
    setCurrentSection(5);
  };

  // Triggers when final envelope is clicked
  const handleLetterOpened = () => {
    setIsCelebration(true);
  };

  // Triggers when "Replay Our Story ❤️" is clicked
  const handleReplay = () => {
    setIsCelebration(false);
    setMaxSectionUnlocked(3); // Relock passcode/question
    setDirection(-1);
    setCurrentSection(1);
  };

  // Swipe navigation logic
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Avoid swipe triggers inside scrollable elements (gallery swipe & timeline log)
    const isScrollable = e.target.closest(".memories-container") || e.target.closest(".timeline-container") || e.target.closest(".diary-letter");
    if (isScrollable) return;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Directional sliding transitions variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100vw" : "-100vw",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 2,
    },
    exit: (dir) => ({
      x: dir < 0 ? "100vw" : "-100vw",
      opacity: 0,
      zIndex: 1,
    }),
  };

  const isIntroSection = currentSection === 1;

  // Framer motion variants for curved letter stagger animation
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
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
        duration: 0.45,
        ease: "easeOut"
      }
    })
  };

  // Staggered text animations for Section 6 Message (starts after title completes)
  const messageLinesContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.9,
        staggerChildren: 1.0, // Delay between each line
      }
    }
  };

  const messageLineItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div 
      className="app-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Dynamic Romantic Background */}
      <RomanticBackground 
        isDark={isIntroSection || (currentSection === 8 && isCelebration)} 
        isCelebration={isCelebration}
      />

      {/* Floating Audio Controller */}
      <MusicController 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        hasInteracted={hasInteracted}
      />

      {/* Animation Viewport */}
      <div style={{ position: "relative", width: "100%", height: "100dvh" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 260, damping: 28 },
              opacity: { duration: 0.3 }
            }}
            className="story-section"
          >
            {/* Section Renderings */}
            {currentSection === 1 && (
              <div style={{ textAlign: "center", color: "#fff", zIndex: 10 }}>
                <motion.h1 
                  className="cursive-title" 
                  style={{ color: "#fff", fontSize: "4rem" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {loveConfig.introTitle}
                </motion.h1>
                <motion.p 
                  style={{ fontSize: "1.2rem", fontWeight: "500", opacity: 0.9, marginBottom: "1rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  {loveConfig.introSub}
                </motion.p>
                <motion.p 
                  style={{ fontSize: "1.1rem", fontStyle: "italic", opacity: 0.8, marginBottom: "2rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  {loveConfig.introQuestion}
                </motion.p>
                <motion.button 
                  className="btn-primary" 
                  onClick={handleStartExperience}
                  style={{ backgroundColor: "var(--rose-pink)", color: "var(--text-dark)", boxShadow: "0 6px 15px rgba(255, 175, 204, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 3, type: "spring" }}
                >
                  {loveConfig.introButton}
                </motion.button>
              </div>
            )}

            {currentSection === 2 && (
              <div className="romantic-card">
                <h2 className="cursive-title">{loveConfig.welcomeTitle}</h2>
                <p className="sub-title" style={{ fontSize: "1.1rem" }}>
                  {loveConfig.welcomeText}
                </p>
                
                {/* Heart scale beating decoration */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  style={{ margin: "1.2rem 0", color: "var(--wine-red)" }}
                >
                  ❤️
                </motion.div>

                <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "var(--wine-red)", marginBottom: "2rem" }}>
                  {loveConfig.welcomeConfirm}
                </p>
                <motion.button 
                  className="btn-primary"
                  onClick={handleNext}
                  whileTap={{ scale: 0.95 }}
                >
                  {loveConfig.welcomeButton}
                </motion.button>
              </div>
            )}

            {currentSection === 3 && (
              <PasscodeScreen onUnlock={handlePasscodeUnlock} />
            )}

            {currentSection === 4 && (
              <QuestionScreen onYes={handleQuestionYes} />
            )}

            {currentSection === 5 && (
              <BirthdayScreen onContinue={handleNext} />
            )}

            {currentSection === 6 && (
              <MemoryGallery onContinue={handleNext} />
            )}

            {currentSection === 7 && (
              <StoryTimeline onContinue={handleNext} />
            )}

            {currentSection === 8 && (
              <LoveLetter 
                onReplay={handleReplay} 
                onLetterOpened={handleLetterOpened}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots Navigation at bottom */}
      <ProgressIndicator 
        currentSection={currentSection} 
        totalSections={8}
        maxSectionUnlocked={maxSectionUnlocked}
        onSectionClick={handleSectionJump}
      />
    </div>
  );
}

