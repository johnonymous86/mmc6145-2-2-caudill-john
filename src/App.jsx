import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  const handleGameStart = () => {
    timerReset();
    timerStart();
    setGameActive(true);
  };

  const handleGameEnd = () => {
    const finalTime = time;  // Capture the time before stopping
    timerStop();
    setGameActive(false);
    
    // Save the current time as previous time
    setPreviousTime(finalTime);
    
    // Update best time using functional setState
    setBestTime(prevBest => {
      if (prevBest === null || finalTime < prevBest) {
        return finalTime;
      }
      return prevBest;
    });
  };

  return (
    <>
      <Header
        time={gameActive ? time : null}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        onGameStart={handleGameStart}
        onGameEnd={handleGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}


