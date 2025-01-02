"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Confetti from "react-confetti";

const ConfettiContext = createContext({
  triggerConfetti: () => {},
});

export const useConfetti = () => useContext(ConfettiContext);

export const ConfettiProvider = ({ children }:{ children: ReactNode }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [pieces, setPieces] = useState(0); 

  const triggerConfetti = () => {
    setShowConfetti(true);
    setPieces(300); 

    
    setTimeout(() => {
      const interval = setInterval(() => {
        setPieces((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setShowConfetti(false); 
            return 0;
          }
          return prev - 10; 
        });
      }, 100);
    }, 2000); 
  };

  return (
    <ConfettiContext.Provider value={{ triggerConfetti }}>
      {children}
      {showConfetti && (
        <Confetti
          width={document.documentElement.clientWidth}
          height={document.documentElement.clientHeight}
          numberOfPieces={pieces} 
        />
      )}
    </ConfettiContext.Provider>
  );
};
