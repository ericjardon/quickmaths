import React, { useState, FC } from 'react';
import { getRandomOperation } from './utils/math'

const App: FC<any> = () => {

  const [operations, setOperations] = useState<string[]>([]);

  const getNewOperation = () => {
    const new_list: string[] = [...operations];

    const target = Math.ceil(Math.random() * 100 + 1);
    console.log("target:", target);
    const op: string = getRandomOperation(target).toString()
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
        <button onClick={getNewOperation}>New Operation</button>
        <ul className="list">
          {
            operations.map(op => (
              <li>{op}</li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
