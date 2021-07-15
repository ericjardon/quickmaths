import React, { useState, FC } from 'react';
import { getRandomOperation } from './utils/math'
import { Addition, Product, Division } from './utils/math';
import ScoreTag from './components/ScoreTag/ScoreTag';
import Bubble from './components/Bubble/Bubble'
import Timebox from './components/Timebox/Timebox';

const App: FC<any> = () => {

  const [gameStatus, setGameStatus] = useState<string>("idle");
  const [operations, setOperations] = useState<Addition[] | Product[] | Division[]>([]);
  const [score, setScore] = useState<number>(0);


  const getNewOperation = () => {
    const new_list: Addition[] | Product[] | Division[] = [...operations];

    const target = Math.ceil(Math.random() * 100 + 1);
    console.log("target:", target);
    const op: Addition | Product | Division = getRandomOperation(target);
    new_list.push(op);
    setOperations(new_list);
  }

  const resetOperations = () => {
    setOperations([]);
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
          {operations.map(op => (
            <Bubble operation={op} />
          ))}
        </div>

        <section id="bottom-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Timebox />
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