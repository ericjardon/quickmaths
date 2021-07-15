import React, { useState, useEffect, FC } from 'react';
import { getRandomOperation } from './utils/math'
import { Addition, Product, Division } from './utils/math';
import ScoreTag from './components/ScoreTag/ScoreTag';
import Bubble from './components/Bubble/Bubble'
import Timebox from './components/Timebox/Timebox';
import GameMenu from './components/GameMenu/GameMenu';
import { getTargetNumber } from './utils/math';


const App: FC<any> = () => {

  const [gameStatus, setGameStatus] = useState<string>("active");
  const [operations, setOperations] = useState<Addition[] | Product[] | Division[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<number>(0)

  useEffect(() => {
    console.log("Generate new round");
    generateNewRound();
  }, [])

  const getNewOperation = () => {
    const newList: Addition[] | Product[] | Division[] = [...operations];

    const op: Addition | Product | Division = getRandomOperation(currentTarget);
    newList.push(op);
    setOperations(newList);
  }

  const resetOperations = () => {
    setOperations([]);
  }

  const generateNewRound = () => {
    let target: number = getTargetNumber();

    setCurrentTarget(target);
  }

  const deleteBubble = (id: number) => {
    const newList = operations.filter((op, index) => id !== index);
    setOperations(newList);
  }

  const roundHasEnded = () => {
    setGameStatus("endRound");
  }

  return (
    <div className="App">

      <header className="App-header">
        <h3 style={{ marginLeft: '16px' }}>Quick Maths Game</h3>
        <nav className="App-nav">
          <button onClick={resetOperations}>Reset Operations</button>
          <button onClick={getNewOperation}>New Operation</button>
        </nav>
      </header>

      <main>
        <div id="bubbles-container">
          <GameMenu status={gameStatus} />

          {gameStatus === "active" && operations.map((op, index) => (
            <Bubble operation={op} lifespan={4} selfDestruct={() => deleteBubble(index)} />
          ))}
        </div>

        <section id="bottom-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Timebox target={currentTarget} roundHasEnded={roundHasEnded} />
          <ScoreTag score={score} />
        </section>
      </main>
    </div>
  );
}

export default App;
/*COLORS
#0E7931 green
*/