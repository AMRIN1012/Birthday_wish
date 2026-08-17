import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { loveConfig } from "../config/loveConfig";

export default function MusicController({ isPlaying, setIsPlaying, hasInteracted }) {
  const audioRef = useRef(null);
  const [audioAvailable, setAudioAvailable] = useState(true);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(loveConfig.musicPath || "/music/romantic-song.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // Check if audio file can be loaded, if it fails, turn off quietly
    const handleError = () => {
      console.warn("Audio file not found or failed to load. Continuing without music.");
      setAudioAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, [setIsPlaying]);

  // Handle play/pause commands from parent or local toggle
  useEffect(() => {
    if (!audioRef.current || !audioAvailable) return;

    if (isPlaying && hasInteracted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay prevented or audio unavailable:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, hasInteracted, audioAvailable, setIsPlaying]);

  const toggleMusic = () => {
    if (!audioAvailable) return;
    setIsPlaying(prev => !prev);
  };

  if (!audioAvailable) return null;

  return (
    <button
      onClick={toggleMusic}
      className="music-toggle-btn"
      aria-label="Toggle background music"
      title={isPlaying ? "Mute Music" : "Play Music"}
      style={{
        border: isPlaying ? "1px solid var(--wine-red)" : "1px solid rgba(255, 204, 213, 0.4)"
      }}
    >
      {isPlaying ? (
        <Volume2 size={20} className="music-icon-playing" style={{ animation: "pulse 1.5s infinite" }} />
      ) : (
        <VolumeX size={20} />
      )}
      
      {/* Tiny CSS pulse animation inline */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.15); opacity: 1; color: #ff4d6d; }
          100% { transform: scale(1); opacity: 0.9; }
        }
      `}</style>
    </button>
  );
}
