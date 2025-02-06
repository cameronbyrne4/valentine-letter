import React from 'react';
import styles from '../styles/Valentine.module.css';

interface LetterComponentProps {
  isOpen: boolean;
  onLetterClick: () => void;
}

export default function LetterComponent({ 
  isOpen, 
  onLetterClick 
}: LetterComponentProps) {
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
        <img 
          src="/images/letter-open.gif" 
          alt="Open Letter" 
          className={styles.letterOpened}
        />
      )}
    </div>
  );
}
