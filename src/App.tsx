import React, { useState, FC } from 'react';
import { getRandomOperation } from './utils/math'
import { Addition, Product, Division } from './utils/math';
import ScoreTag from './components/ScoreTag/ScoreTag';
import Bubble from './components/Bubble/Bubble'

const App: FC<any> = () => {

  const [gameStatus, setGameStatus] = useState<string>("idle");
  const [operations, setOperations] = useState<Addition[] | Product[] | Division[]>([]);

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
        <h1>Quick Maths Game</h1>
        <button onClick={resetOperations}>Reset Operations</button>
      </header>
      <main>
        <section id="ops-list">
          <button onClick={getNewOperation}>New Operation</button>
          <ul className="list">
            {
              operations.map(op => (
                <li>{op.toString()}</li>
              ))}
          </ul>
        </section>

        <div className="bubbles-container" style={{ height: "60vh", width: "100%", background: "#0E7931" }}>
          {operations.map(op => (
            <Bubble operation={op} />
          ))}
        </div>

        <section id="bottom-bar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <ScoreTag score={188} />
        </section>
      </main>
    </div>
  );
}

export default App;
/*COLORS
#0E7931 green
*/