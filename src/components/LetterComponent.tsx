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
  const [soundEffect, setSoundEffect] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create sound effect object only in the browser
    const letterOpenSound = new Audio('/sound/letter-open-sound.mp3');
    letterOpenSound.volume = 0.5; // Set sound effect volume (50%)
    setSoundEffect(letterOpenSound);

    // Cleanup function to pause sound effect when component unmounts
    return () => {
      letterOpenSound.pause();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      soundEffect?.play(); // Play sound effect when the letter is opened
      setShowStaticImage(false); // Reset to show GIF when opened
      const timer = setTimeout(() => {
        setShowStaticImage(true); // Show static image after 1.5 seconds
      }, 1500); // 1500 milliseconds = 1.5 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isOpen, soundEffect]);

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
