import { useState, useEffect } from "react";
import "./AutoPlay.css";
function AutoPlay() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % 6);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="auto-play">
        <img
          className="visible"
          src={`/assets/${count}.jpg`}
          alt={`Image ${count}`}
        />
      </div>
    </div>
  );
}

export default AutoPlay;
