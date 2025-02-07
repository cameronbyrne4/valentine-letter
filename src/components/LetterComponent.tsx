import React, { useState, useEffect } from 'react';
import styles from '../styles/Valentine.module.css';

interface LetterComponentProps {
  isOpen: boolean;
  onLetterClick: () => void;
}

export default function LetterComponent({ 
  isOpen, 
  onLetterClick 
}: LetterComponentProps) {
  const [showStaticImage, setShowStaticImage] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [soundEffect, setSoundEffect] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio objects only in the browser
    const backgroundMusic = new Audio('/sound/background-music.mp3');
    const letterOpenSound = new Audio('/sound/letter-open-sound.mp3');

    // Set the volume for both audio elements
    backgroundMusic.volume = 0.3; // Set background music volume (30%)
    letterOpenSound.volume = 0.5; // Set sound effect volume (50%)

    setAudio(backgroundMusic);
    setSoundEffect(letterOpenSound);

    // Cleanup function to pause music when component unmounts
    return () => {
      backgroundMusic.pause();
      letterOpenSound.pause();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      soundEffect?.play(); // Play sound effect when the letter is opened
      setShowStaticImage(false); // Reset to show GIF when opened
      const timer = setTimeout(() => {
        setShowStaticImage(true); // Show static image after 1 second
      }, 1500); // 1000 milliseconds = 1 second

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isOpen, soundEffect]);

  useEffect(() => {
    if (audio) {
      audio.loop = true; // Set background music to loop
      audio.play(); // Start playing background music
    }

    return () => {
      if (audio) {
        audio.pause(); // Pause music when component unmounts
        audio.currentTime = 0; // Reset music to start
      }
    };
  }, [audio]);

  return (
    <div 
      className={`${styles.letterContainer} ${isOpen ? styles.letterOpen : ''}`}
      onClick={!isOpen ? onLetterClick : undefined}
    >
      {!isOpen ? (
        <img 
          src="/images/closed-letter.gif" 
          alt="Closed Letter" 
          className={styles.letter}
        />
      ) : (
        <>
          {!showStaticImage ? (
            <img 
              src="/images/letter-open.gif" 
              alt="Open Letter" 
              className={styles.letterOpened}
            />
          ) : (
            <img 
              src="/images/letter-open-static.png" // Static image for the final frame
              alt="Open Letter Static" 
              className={styles.letterOpened}
            />
          )}
        </>
      )}
    </div>
  );
}
