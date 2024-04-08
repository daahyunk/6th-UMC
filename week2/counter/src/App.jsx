import { useState } from 'react';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
    console.log("increase가 클릭됨");
  };

  const handleDecrease = () => {
    setCount(count - 1);
    console.log("decrease가 클릭됨");
  };

  return (
    <>
      <div className="counter-container">
        <div className="counter">{count}</div>
        <div className="buttons">
          <button className="button" onClick={handleIncrease}>+1</button>
          <button className="button" onClick={handleDecrease}>-1</button>
        </div>
      </div>
    </>
  );
}

export default App;
