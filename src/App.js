import { useState } from "react";
import Board from "./Board";
import "./index.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('player');
  const [showImage, setShowImage] = useState(false);

  const handleGameModeChange = (m) => {
    setGameMode(m);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleClick = (i) => {
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    if (checkWinner(newSquares)) {
      setShowImage(true);
      return;
    }
    setXIsNext(!xIsNext);
    if (gameMode === 'computer') {
      const emptySquares = newSquares.reduce(
        (acc, value, index) => (value == null ? [...acc, index] : acc),
        []
      );
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const computerMove = emptySquares[randomIndex];
      newSquares[computerMove] = "O";
      setSquares(newSquares);
      if (checkWinner(newSquares)) {
        setShowImage(true);
        return;
      }
      setXIsNext(true);
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowImage(null);
  };

  const winner = checkWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square != null)) {
    status = "Draw";
  }

  return (
    <div className="game">
      <div className="center">
        <Board squares={squares} onClick={i => handleClick(i)} />
      </div>
      <div>
        <button className="button" onClick={() => handleGameModeChange("player")}>Human</button>
        <button className="button" onClick={() => handleGameModeChange("computer")}>Computer</button>
        <button className="button" onClick={handleReset}>Reset</button>
      </div>
      
      <div className="status">{status}</div>
      {showImage && <img src={process.env.PUBLIC_URL + "/vui.png"} alt="win" style={{ maxWidth: "300px" }} />}
    </div>


  );

  function checkWinner(squares) {
    const lines = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}



