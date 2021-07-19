import React, { useState, FC } from 'react';
import ScoreTag from './components/ScoreTag/ScoreTag';
import Bubble from './components/Bubble/Bubble'
import Timebox from './components/Timebox/Timebox';
import GameMenu from './components/GameMenu/GameMenu';

import { getTargetNumber, intervals, lifespans } from './utils/math';


const numberOfRounds = 5;

const App: FC<any> = () => {

  const [gameStatus, setGameStatus] = useState<string>("welcome"); // 'welcome' | 'active' | 'endRound'
  const [bubbles, setBubbles] = useState<number[]>([]); //Addition[] | Division[] | Product[]
  const [bubbleKey, setBubbleKey] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<number>(0);
  const [lastHit, setLastHit] = useState<boolean>(true);

  const [multiplier, setMultiplier] = useState<number>(0);
  // Difficulty level depends on round number
  const [currentRound, setCurrentRound] = useState<number>(0);  // increasing difficulty
  const [bubbleLifespan, setBubbleLifespan] = useState<number>(0);
  const [timeboxSpeed, setTimeBoxSpeed] = useState<number>(0);

  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [totalIncorrect, setTotalIncorrect] = useState<number>(0);
  const [totalBubbles, settotalBubbles] = useState<number>(0);


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
    console.log("Start new round");
    setGameStatus("active");
    setCurrentTarget(target);
    console.log("Next round target =", target);
    resetBubbles();
  }

  const getNewBubble = () => {
    let k = bubbleKey + 1;
    setBubbles([...bubbles, k]);
    setBubbleKey(k);
    settotalBubbles(totalBubbles => totalBubbles + 1);
  }

  const roundHasEnded = () => {
    console.log("Round ended");
    if (currentRound < numberOfRounds) {
      setGameStatus("endRound");

    } else {
      setGameStatus("finished");
    }
  }

  const gameHasEnded = () => {
    console.log("All rounds done");
    setGameStatus("finished");
  }

  const updateScore = (points: number) => {

    if (points > 0) {
      setTotalCorrect(totalCorrect => totalCorrect + 1);
      setLastHit(true)
    } else {
      setTotalIncorrect(totalIncorrect => totalIncorrect + 1);
      setLastHit(false)
    }

    console.log("Add to score:", points);
    setScore(score => score + points);
  }

  if (gameStatus === "dev")
    return (
      <div className="App" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <nav className="App-nav">
          <button onClick={resetBubbles}>Reset bubbles</button>
          <button onClick={getNewBubble}>New Operation</button>
        </nav>
        <Bubble key={1} target={currentTarget} lifespan={10} updateScore={updateScore} multiplier={multiplier} />
      </div>
    )
  else return (
    <div className="App">

      <header className="App-header">
        <h3 style={{ marginLeft: '16px' }}>Quick Maths Game</h3>
      </header>

      <main>
        <div id="bubbles-container">
          <GameMenu
            status={gameStatus}
            round={currentRound}
            startNextRound={generateNewRound}
            totalCorrect={totalCorrect}
            totalIncorrect={totalIncorrect}
            totalBubbles={totalBubbles} />

          {gameStatus === "active" && bubbles.map((bkey, index) => (
            <Bubble
              key={index}
              target={currentTarget}
              lifespan={bubbleLifespan}
              updateScore={updateScore}
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
            <ScoreTag score={score} scoreIncreased={lastHit} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App;