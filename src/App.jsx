import React, { useState } from 'react';
import './App.css';

let idCounter = 0;

const Firework = ({ x }) => {
  const [exploded, setExploded] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setExploded(true), 1200); // explosion after launch
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`rocket ${exploded ? 'explode' : ''}`}
      style={{ left: `${x}px` }}
    >
      {!exploded && <div className="rocket-body" />}
      {exploded && (
        <div className="explosion">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--angle': `${(360 / 24) * i}deg`,
                '--color': getRandomColor(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [fireworks, setFireworks] = useState([]);

  const handleClick = (e) => {
    const x = e.clientX;
    const id = idCounter++;
    setFireworks((prev) => [...prev, { id, x }]);

    setTimeout(() => {
      setFireworks((prev) => prev.filter((f) => f.id !== id));
    }, 2500); // remove after explosion
  };

  return (
    <div className="sky" onClick={handleClick}>
      {fireworks.map((f) => (
        <Firework key={f.id} x={f.x} />
      ))}
      <p className="tip">🎇 Click anywhere to launch a firework!</p>
    </div>
  );
}

function getRandomColor() {
  const colors = ['#ff4b4b', '#ffe600', '#00f0ff', '#ff00f0', '#00ff9f'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default App;
