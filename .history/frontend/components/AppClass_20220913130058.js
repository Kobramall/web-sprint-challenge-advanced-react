import React, { useEffect } from 'react'
import axios from 'axios'



// Suggested initial states
const initialMessage = '(2,2)'
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

   
   getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    console.log(this.state.index)
    if(this.state.index === 0){
      this.setState({...this.state, message: "(1,1)"})
      
    }
    else if(this.state.index === 1){
      this.setState({...this.state, message: "(2,1)"})
      console("Here:", this.state.message)
    }
    else if(this.state.index === 2){
      this.setState({...this.state, message: "(3,1)"})
    }
    else if(this.state.index === 3){
      this.setState({...this.state, message: "(1,2)"})
    }
    else if(this.state.index === 4){
      this.setState({...this.state, message: initialMessage})
    }
    else if(this.state.index === 5){
      this.setState({...this.state, message: "(3,2)"})
    }
    else if(this.state.index === 6){
      this.setState({...this.state, message: "(1,3)"})
    }
    else if(this.state.index === 7){
      this.setState({...this.state, message: "(2,3)"})
    }
    else if(this.state.index === 8){
      this.setState({...this.state, message: "(3,3)"})
    }
  }

  

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    this.setState({...this.state, index: 4});
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left" && this.state.index != 0 && this.state.index != 3 && this.state.index != 6){
       console.log(this.state.index - 1)
        return this.state.index - 1
    }
    else if (direction === "right" && this.state.index != 2 && this.state.index != 5 && this.state.index != 8){
      console.log(this.state.index + 1)
        return this.state.index + 1
    }
    else if (direction === "up" && this.state.index != 0 && this.state.index != 1 && this.state.index != 2){
      console.log(this.state.index - 3)
       return this.state.index - 3
    }
    else if (direction === "down" && this.state.index != 6 && this.state.index != 7 && this.state.index != 8){
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
    console.log(this.getNextIndex(evt.target.id))
    this.setState({...this.state, index: this.getNextIndex(evt.target.id)})
    this.getXY()
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
          <h3 id="coordinates">Coordinates {this.state.message}</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right"onClick={this.move}  >RIGHT</button>
          <button id="down" onClick={this.move} >DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
