import React, { useState, useEffect, FC } from 'react';
import ScoreTag from './components/ScoreTag/ScoreTag';
import Bubble from './components/Bubble/Bubble'
import Timebox from './components/Timebox/Timebox';
import GameMenu from './components/GameMenu/GameMenu';

import { getTargetNumber, intervals, lifespans } from './utils/math';


const App: FC<any> = () => {

  const [gameStatus, setGameStatus] = useState<string>("welcome"); // 'welcome' | 'active' | 'endRound'
  const [bubbles, setBubbles] = useState<number[]>([]); //Addition[] | Division[] | Product[]
  const [bubbleKey, setBubbleKey] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<number>(0);

  const [multiplier, setMultiplier] = useState<number>(0);
  // Difficulty level depends on round number
  const [currentRound, setCurrentRound] = useState<number>(0);  // increasing difficulty
  const [bubbleLifespan, setBubbleLifespan] = useState<number>(0);
  const [timeboxSpeed, setTimeBoxSpeed] = useState<number>(0);

  /* useEffect(() => {
    console.log("Generate new round");
    generateNewRound();
  }, []) */


  /* Note: setInterval is a function of the window object. Whichever callback we pass to it, it will contain
  static values that are not updated regardless of React logic. Better to use timeouts for every change. */

  const resetBubbles = () => {
    console.log("Reset bubbles");
    setBubbles([]);
  }

  const generateNewRound = () => {

    setBubbleLifespan(lifespans[currentRound]);
    setTimeBoxSpeed(intervals[currentRound]);

    setMultiplier(multiplier => (currentRound + 1) * 10);
    setCurrentRound(currentRound => currentRound + 1);

    let target: number = getTargetNumber();
    console.log("Starting round");
    setGameStatus("active");
    setCurrentTarget(target);
    console.log("Next round! Target=", target);
    resetBubbles();
  }

  const getNewBubble = () => {
    let k = bubbleKey + 1;
    setBubbles([...bubbles, k]);
    setBubbleKey(k);
  }

  const roundHasEnded = () => {
    console.log("Round has ended");
    setGameStatus("endRound");
  }

  const addToScore = (points: number) => {
    console.log("Add to score:", points);
    setScore(score => score + points);
  }

  console.log("bubble lifespan is now:", bubbleLifespan);
  console.log("timebox interval is now:", timeboxSpeed);

  if (gameStatus === "dev")
    return (
      <div className="App" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <nav className="App-nav">
          <button onClick={resetBubbles}>Reset bubbles</button>
          <button onClick={getNewBubble}>New Operation</button>
        </nav>
        <Bubble key={1} target={currentTarget} lifespan={10} addToScore={addToScore} multiplier={multiplier} />
      </div>
    )
  else return (
    <div className="App">

      <header className="App-header">
        <h3 style={{ marginLeft: '16px' }}>Quick Maths Game</h3>
      </header>

      <main>
        <div id="bubbles-container">
          <GameMenu status={gameStatus} round={currentRound} startNextRound={generateNewRound} />

          {gameStatus === "active" && bubbles.map((bkey, index) => (
            <Bubble
              key={index}
              target={currentTarget}
              lifespan={bubbleLifespan}
              addToScore={addToScore}
              multiplier={multiplier} />
          ))}
        </div>

        <section id="bottom-bar">
          <div style={{ width: '20%', paddingTop: '25px' }}>
            {gameStatus === 'active' && <p id="round-number">Round: {currentRound}</p>}
          </div>
          <div style={{ width: '60%' }}>
            <Timebox
              status={gameStatus}
              target={currentTarget}
              roundHasEnded={roundHasEnded}
              createBubble={getNewBubble}
              intervalSeconds={timeboxSpeed} />
          </div>
          <div style={{ width: '20%', paddingTop: '25px' }}>
            <ScoreTag score={score} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App;