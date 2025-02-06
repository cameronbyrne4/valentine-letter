import React, { useState } from 'react';
import LetterComponent from '../components/LetterComponent';
import styles from '../styles/Valentine.module.css';

export default function ValentinePage() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleLetterClick = () => {
    setIsLetterOpen(true);
  };

  const handleReset = () => {
    setIsLetterOpen(false);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}