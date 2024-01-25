import React from "react"
// import moment from "moment"
import Die from "./Die"
// import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import { nanoid } from 'nanoid'
// import 'react-native-get-random-values'
import Confetti from "react-confetti"

// let date_create = moment().format("YYYY-MM-DD hh:mm:ss")

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [lowestRolls, setLowestRolls] = React.useState(() => {
    const saved = localStorage.getItem("lowestRolls");
    const initialValue = JSON.parse(saved);
    return initialValue || -1;
  });
  

  // const [time, setTime] = React.useState(0);
  // const [bestTime, setBestTime] = React.useState(
  //   localStorage.getItem('bestTime') || Infinity)

  
    // const [time, setTime] = React.useState(0);
    // const [bestTime, setBestTime] = React.useState(
    //   localStorage.getItem('bestTime') || Infinity
    // );

    // React.useEffect(() => {
    //   setTime((prevTime) => prevTime + 1);
    // }, 1000);
    // return () => clearInterval(interval);  
    // }, [])

  //   React.useEffect(() => {
  //     if (counter < bestTime) {
  //       setBestTime(counter);
  //       localStorage.setCounter('bestTime', counter.toString());
  //     }
  //   }, [counter, bestTime])

    

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      if (lowestRolls === -1 || counter < lowestRolls)
      setLowestRolls(counter)
      // if (counter < bestTime) {
      //   setBestTime(counter)
      // }
    }
  }, [dice, counter, lowestRolls])

  React.useEffect(() => {
    localStorage.setItem("lowestRolls", JSON.stringify(lowestRolls));
  }, [lowestRolls]);

  

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
        {/* Link to confetti https://www.npmjs.com/package/react-confetti
        colors={['#f44336''#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4CAF50','#8BC34A','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722','#795548']} */}
        {tenzies && <Confetti numberOfPieces={2000} colors={['#FFFFFF','#3f51b5','#2196f3','#03a9f4','#673ab7']} />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className="score">
          <button className="button-score">Best score: {lowestRolls > -1 ? lowestRolls : ''}</button>
          <button className="button-score">Rolls: {counter}</button>
        </div>


        {/* <div>
          <p>Time: {counter} seconds</p>
          <p>Best Time: {bestTime === Infinity ? 'N/A' : `${bestTime} seconds`}</p>
          {counter}
        </div> */}

          <div className="dice-container">
            {diceElements}
          </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}
