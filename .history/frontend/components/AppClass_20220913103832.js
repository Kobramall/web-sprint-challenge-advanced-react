import React, { useState } from 'react'
import axios from 'axios'



// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
   constructor(){
    super()
    this.state = initialState
   }


  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left" && this.state.index ==! (0 || 3 || 6)){
       console.log(this.state.index - 1)
      return  this.state.index - 1
    }
    else if (direction === "right" && this.state.index ==! (2 || 5 || 8)){
      console.log(this.state.index + 1)
      return  this.state.index + 1
    }
    else if (direction === "up" && this.state.index ==! (0 || 1 || 2)){
      console.log(this.state.index - 3)
      return this.state.index - 3
    }
    else if (direction === "down" && this.state.index ==! (6 || 7 || 8)){
      console.log(this.state.index + 3)
      return this.state.index + 3
    }
    else {
      console.log(this.state.index)
      return this.state.index
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.state.index = this.getNextIndex(evt.click)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    axios.post('http://localhost:9000/api/result')
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={getNextIndex("left")}>LEFT</button>
          <button id="up" onClick={getNextIndex("up")} >UP</button>
          <button id="right" onClick={getNextIndex("right")}>RIGHT</button>
          <button id="down" onClick={getNextIndex("down")}>DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}