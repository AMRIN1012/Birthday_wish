import React from "react";
import { Heart } from "lucide-react";

export default function ProgressIndicator({ 
  currentSection, 
  totalSections = 10, 
  maxSectionUnlocked, 
  onSectionClick 
}) {
  return (
    <div className="progress-container">
      {Array.from({ length: totalSections }).map((_, idx) => {
        const sectionNum = idx + 1;
        const isActive = currentSection === sectionNum;
        const isUnlocked = sectionNum <= maxSectionUnlocked;

        return (
          <button
            key={idx}
            className={`progress-heart ${isActive ? "active" : ""} ${isUnlocked ? "completed" : ""}`}
            onClick={() => isUnlocked && onSectionClick(sectionNum)}
            disabled={!isUnlocked}
            aria-label={`Go to section ${sectionNum}`}
            title={`Go to section ${sectionNum}`}
          >
            <Heart 
              size={isActive ? 16 : 12} 
              fill={isActive ? "var(--wine-red)" : (isUnlocked ? "var(--rose-pink)" : "none")}
              strokeWidth={isActive ? 0 : (isUnlocked ? 0 : 2)}
              style={{
                transition: "all 0.3s ease"
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
