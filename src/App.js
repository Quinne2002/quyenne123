import { useState, useEffect } from "react";

import Board from "./Board";
import "./index.css";

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('player');

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext) {
      const timer = setTimeout(() => {
        handleComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, gameMode]);

  const handleGameModeChange = (m) => {
    setGameMode(m);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleComputerMove = () => {
    const emptySquares = squares.reduce(
      (acc, value, index) => (value == null ? [...acc, index] : acc),
      []
    );
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const computerMove = emptySquares[randomIndex];
    const newSquares = [...squares];
    newSquares[computerMove] = "O";
    setSquares(newSquares);
    setXIsNext(true);
  };

  const handleClick = (i) => {
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setSquares(squares);
    setXIsNext(!xIsNext);
  };
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };



  const winner = checkWinner(squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square != null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="reset" onClick={handleReset}>Reset</button>
         <div>
        <button
          className={gameMode === "player" ? "active" : ""}
          onClick={() => handleGameModeChange("player")}
        >
          Player vs. Player
        </button>
        <button
          className={gameMode === "computer" ? "active" : ""}
          onClick={() => handleGameModeChange("computer")}
        >
          Player vs. Computer
        </button>
      </div>
      </div>
     

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

