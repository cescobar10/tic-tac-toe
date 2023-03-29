import { useState } from "react";

export const Square = ({ value, onSquareClick }) => {
    return (
        <>
            <button className="square" onClick={onSquareClick}>
                {value}
            </button>
        </>
    );
};

export const Board = ({ xIsFirst, square, onPlay }) => {
    const winner = calculateWinner(square);

    function handleClick(i) {
        if (square[i] || winner) {
            return;
        }
        const copySquare = square.slice();
        copySquare[i] = xIsFirst ? "X" : "O";
        onPlay(copySquare);
    }

    const gameStatus = winner
        ? "Winner: " + winner
        : "Next Player is " + (xIsFirst ? "X" : "O");

    return (
        <>
            <div className="status">{gameStatus}</div>
            <div className="board-row">
                <Square
                    value={square[0]}
                    onSquareClick={() => handleClick(0)}
                />
                <Square
                    value={square[1]}
                    onSquareClick={() => handleClick(1)}
                />
                <Square
                    value={square[2]}
                    onSquareClick={() => handleClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={square[3]}
                    onSquareClick={() => handleClick(3)}
                />
                <Square
                    value={square[4]}
                    onSquareClick={() => handleClick(4)}
                />
                <Square
                    value={square[5]}
                    onSquareClick={() => handleClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={square[6]}
                    onSquareClick={() => handleClick(6)}
                />
                <Square
                    value={square[7]}
                    onSquareClick={() => handleClick(7)}
                />
                <Square
                    value={square[8]}
                    onSquareClick={() => handleClick(8)}
                />
            </div>
        </>
    );
};

export default function Game() {
    const [xIsFirst, setxIsFirst] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquare = history[currentMove];

    function handlePlay(nextSquare) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setxIsFirst(!xIsFirst);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setxIsFirst(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        description = move > 0 ? "Go to move # " + move : "Go to start game";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsFirst={xIsFirst}
                    square={currentSquare}
                    onPlay={handlePlay}
                />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
