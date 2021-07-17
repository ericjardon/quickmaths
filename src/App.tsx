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


  useEffect(() => {
    console.log("Start interval effect")
    if (gameStatus === "active") {
      const interval = setInterval(getNewBubble, 1500);

      // Clear the interval on unmount
      return () => clearInterval(interval);
    } else {
      console.log("Bubble generation stopped");
    }

  }, [gameStatus])


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
    console.log("get new bubble...");
    setBubbles([...bubbles, bubbleKey + 1]);
    setBubbleKey(bubbleKey => bubbleKey + 1);
  }

  const deleteBubble = () => {
    const _bubbles = [...bubbles]
    _bubbles.shift();
    setBubbles(_bubbles);
  }

  const roundHasEnded = () => {
    setGameStatus("endRound");
  }

  console.log("Re render with bubbles", bubbles);

  if (gameStatus !== "dev")
    return (
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
              <Bubble key={bkey} target={currentTarget} lifespan={4} selfDestruct={() => deleteBubble()} />
            ))}
          </div>

          <section id="bottom-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Timebox target={currentTarget} roundHasEnded={roundHasEnded} />
            <ScoreTag score={score} />
          </section>
        </main>
      </div>
    )
  else return (
    <div className="App" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <GameMenu status={"endRound"} startNextRound={generateNewRound} />PachisPachis
    </div>
  )
}

export default App;
/*COLORS
#0E7931 green
*/