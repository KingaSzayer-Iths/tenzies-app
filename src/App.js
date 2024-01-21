import React from "react"
import Die from "./Die"
// import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [counter, setCounter] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setCounter(counter + 1)
      setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
      }))
  } else {
    setTenzies(false)
    setDice(allNewDice())
    setCounter(0)
  }
}

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  
  const diceElements = dice.map(die => 
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

    return (
        <main>
        {/* Link to confetti https://www.npmjs.com/package/react-confetti */}
        {tenzies && <Confetti numberOfPieces={2000} colors={['#FFFFFF']} />}
        <h1 className="title">Tenzies</h1>
        <h2>{counter}</h2>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceElements}
          </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}
