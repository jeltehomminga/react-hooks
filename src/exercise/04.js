// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from './02'

const Square = ({ selectSquare, squareValue }) => (
  <button className="square" onClick={selectSquare}>
    {squareValue}
  </button>
)

function Board({ squares, onClick }) {
  const getProps = num => ({
    squareValue: squares[num],
    selectSquare: () => onClick(num),
  })

  return (
    <div>
      <div className="board-row">
        <Square {...getProps(0)} />
        <Square {...getProps(1)} />
        <Square {...getProps(2)} />
      </div>
      <div className="board-row">
        <Square {...getProps(3)} />
        <Square {...getProps(4)} />
        <Square {...getProps(5)} />
      </div>
      <div className="board-row">
        <Square {...getProps(6)} />
        <Square {...getProps(7)} />
        <Square {...getProps(8)} />
      </div>
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useLocalStorageState('squares', () => [
    Array(9).fill(null),
  ])
  const [currentStep, setCurrentStep] = useLocalStorageState('step', 0)
  const currentSquares = squares[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) return
    const newSquares = [...squares[currentStep]]
    newSquares[square] = nextValue
    setSquares([...squares.filter((_, i) => i <= currentStep), newSquares])
    setCurrentStep(step => step + 1)
  }

  function restart() {
    setCurrentStep(0)
    setSquares([Array(9).fill(null)])
  }

  const moves = squares.map((_, i) => {
    const currentStep = i === squares.length - 1
    return (
      <button key={i} onClick={() => setCurrentStep(i)}>
        {i === 0 ? 'start' : currentStep ? 'currentStep' : 'step' + i}
      </button>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
