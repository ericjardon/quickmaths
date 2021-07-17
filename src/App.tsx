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
  const [currentRound, setCurrentRound] = useState<number>(5);  // increasing difficulty

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
    console.log("Next round!");
    let target: number = getTargetNumber();
    setGameStatus("active");
    setCurrentTarget(target);
    resetBubbles();
  }

  const getNewBubble = () => {
    console.log("apend new bubble...");
    let k = bubbleKey + 1;
    setBubbles([...bubbles, k]);
    setBubbleKey(k);
  }

  const deleteBubble = () => {
    console.log("pop first bubble...");
    setBubbles(bubbles.slice(1));
  }

  const roundHasEnded = () => {
    setGameStatus("endRound");
  }

  console.log("Re render with bubbles:", bubbles);
  console.log("Current key", bubbleKey);

  if (gameStatus === "dev")
    return (
      <div className="App" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <GameMenu status={"endRound"} startNextRound={generateNewRound} />PachisPachis
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
          <GameMenu status={gameStatus} startNextRound={generateNewRound} />

          {gameStatus === "active" && bubbles.map((bkey, index) => (
            <Bubble key={index} target={currentTarget} lifespan={4} selfDestruct={() => deleteBubble()} />
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
/*COLORS
#0E7931 green
*/