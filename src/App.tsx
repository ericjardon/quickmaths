import React, { useState, useEffect, FC } from 'react';
import ScoreTag from './components/ScoreTag/ScoreTag';
import Bubble from './components/Bubble/Bubble'
import Timebox from './components/Timebox/Timebox';
import GameMenu from './components/GameMenu/GameMenu';

import { Addition, Division, Product, getTargetNumber, getRandomOperation } from './utils/math';


const App: FC<any> = () => {

  const [gameStatus, setGameStatus] = useState<string>("active");
  const [bubbles, setBubbles] = useState<number[]>([]); //Addition[] | Division[] | Product[]
  const [bubbleKey, setBubbleKey] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(0);  // increasing difficulty
  const [multiplier, setMultiplier] = useState<number>(0);

  useEffect(() => {
    console.log("Generate new round");
    generateNewRound();
  }, [])


  /* Note: setInterval is a function of the window object. Whichever callback we pass to it, it will contain
  static values that are not updated regardless of React logic. Better to use timeouts for every change. */

  const resetBubbles = () => {
    console.log("Reset bubbles");
    setBubbles([]);
  }

  const generateNewRound = () => {

    setMultiplier(multiplier => (currentRound + 1) * 10);
    setCurrentRound(currentRound => currentRound + 1);

    let target: number = getTargetNumber();
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
    setGameStatus("endRound");
  }

  const addToScore = (points: number) => {
    console.log("Add to score:", points);
    setScore(score => score + points);
  }

  /* console.log("Re render with bubbles:", bubbles);
  console.log("Current key", bubbleKey); */

  if (gameStatus === "dev")
    return (
      <div className="App" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Bubble key={1} target={currentTarget} lifespan={10} addToScore={addToScore} multiplier={multiplier} />
      </div>
    )
  else return (
    <div className="App">

      <header className="App-header">
        <h3 style={{ marginLeft: '16px' }}>Quick Maths Game</h3>
        <nav className="App-nav">
          <button onClick={resetBubbles}>Reset bubbles</button>
          <button onClick={getNewBubble}>New Operation</button>
        </nav>
      </header>

      <main>
        <div id="bubbles-container">
          <GameMenu status={gameStatus} round={currentRound} startNextRound={generateNewRound} />

          {gameStatus === "active" && bubbles.map((bkey, index) => (
            <Bubble key={index} target={currentTarget} lifespan={4} addToScore={addToScore} multiplier={multiplier} />
          ))}
        </div>

        <section id="bottom-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Timebox target={currentTarget} roundHasEnded={roundHasEnded} createBubble={getNewBubble} />
          <ScoreTag score={score} />
        </section>
      </main>
    </div>
  )
}

export default App;