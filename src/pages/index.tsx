import React, { useState, useEffect } from 'react';
import LetterComponent from '../components/LetterComponent';
import styles from '../styles/Valentine.module.css';

export default function ValentinePage() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleLetterClick = () => {
    setIsLetterOpen(true);
  };

  const handleReset = () => {
    setIsLetterOpen(false);
  };

  const handleStart = () => {
    setIsGameStarted(true);
    if (!audio) {
      const backgroundMusic = new Audio('/sound/background-music.mp3');
      backgroundMusic.volume = 0.4; // Set background music volume (40%)
      backgroundMusic.loop = true; // Set background music to loop
      backgroundMusic.play().catch((error) => {
        console.error("Error playing background music:", error);
      });
      setAudio(backgroundMusic);
    }
  };

  useEffect(() => {
    const handleKeyPress = () => {
      if (!isGameStarted) {
        handleStart();
      }
    };

    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameStarted]);

  return (
    <div className={styles.container}>
      {!isGameStarted ? (
        <div className={styles.startScreen}>
          <h1>Click any key to begin</h1>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <img 
              src="/images/you-got-mail.png" 
              alt="You got mail" 
              className={styles.headerText}
            />
            {/* 
            <img 
              src="/images/click-to-open.gif" 
              alt="Click the letter to open it" 
              className={styles.subHeaderText}
            />
            */}
          </div>
          
          <LetterComponent 
            isOpen={isLetterOpen} 
            onLetterClick={handleLetterClick}
          />
          
          {isLetterOpen && (
            <button 
              onClick={handleReset} 
              className={styles.resetButton}
            >
              <img 
                src="/images/reset.png" 
                alt="Reset" 
                className={styles.resetButtonImage}
              />
            </button>
          )}
        </>
      )}
    </div>
  );
}