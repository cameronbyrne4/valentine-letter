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

  useEffect(() => {
    if (isOpen) {
      setShowStaticImage(false); // Reset to show GIF when opened
      const timer = setTimeout(() => {
        setShowStaticImage(true); // Show static image after 1 second
      }, 1500); // 1000 milliseconds = 1 second

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isOpen]);

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
