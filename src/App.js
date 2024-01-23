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

    const value = Math.ceil(Math.random() * 6)

    console.log(value);
    return {
      value: value,
      topLeft: value === 6 || value === 5 || value === 4 ? true : false, 
      topCenter: value === 6 ? true : false, 
      topRight: value === 6 || value === 5 || value === 4 || value === 3 || value === 2 ? true : false, 
      center: value === 5 ||  value === 3 || value === 1 ? true : false,
      bottomLeft: value === 6 || value === 5 || value === 4 || value === 3 || value === 2 ? true : false, 
      bottomCenter: value === 6 ? true : false, 
      bottomRight: value === 6 || value === 5 || value === 4 ? true : false, 
      isHeld: false,
      id: nanoid()
    }
  }

  console.log(dice);

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
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} 
      topLeft={die.topLeft} 
      topCenter={die.topCenter} 
      topRight={die.topRight} 
      center={die.center} 
      bottomLeft={die.bottomLeft} 
      bottomCenter={die.bottomCenter} 
      bottomRight={die.bottomRight}
    />)

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
