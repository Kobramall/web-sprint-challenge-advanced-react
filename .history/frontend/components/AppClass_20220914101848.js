import React from 'react'
import axios from 'axios'



// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  x: initialX,
  y: initialY
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
    if(this.state.index === 0){
      this.setState({...this.state, x: 1, y:1})
      return "(1,1)"
      
    }
    else if(this.state.index === 1){
      this.setState({...this.state, x: 2, y:1})
      return "(2,1)"
      
    }
    else if(this.state.index === 2){
      this.setState({...this.state, x: 3, y:1})
      return "(3,1)"
      
    }
    else if(this.state.index === 3){
      this.setState({...this.state, x: 1, y:2})
      return "(1,2)"
    }
    else if(this.state.index === 4){
      this.setState({...this.state, x: 2, y:2})
      return initialMessage
    }
    else if(this.state.index === 5){
      this.setState({...this.state, x: 3, y:2})
      return "(3,2)"
    }
    else if(this.state.index === 6){
      this.setState({...this.state, x: 1, y:3})
      return "(1,3)"
    }
    else if(this.state.index === 7){
      this.setState({...this.state, x: 2, y:3})
      return "(2,3)"
    }
    else if(this.state.index === 8){
      this.setState({...this.state, x: 3, y:3})
      return "(3,3)"
    }
  }

  
  setX(){
    if(this.state.index === 0){
      return 1
      
    }
    else if(this.state.index === 1){
       return 2
      
    }
    else if(this.state.index === 2){
      return 3
      
    }
    else if(this.state.index === 3){
     return 1
    }
    else if(this.state.index === 4){
      return initialX
    }
    else if(this.state.index === 5){
       return 3
    }
    else if(this.state.index === 6){
      return 1
    }
    else if(this.state.index === 7){
      return 2
    }
    else if(this.state.index === 8){
       return 3
    }
  }

  setY(){
    if(this.state.index === 0){
      return 1
      
    }
    else if(this.state.index === 1){
       return 1
      
    }
    else if(this.state.index === 2){
      return 1
      
    }
    else if(this.state.index === 3){
     return 2
    }
    else if(this.state.index === 4){
      return initialY
    }
    else if(this.state.index === 5){
       return 2
    }
    else if(this.state.index === 6){
      return 3
    }
    else if(this.state.index === 7){
      return 3
    }
    else if(this.state.index === 8){
       return 3
    }
  }



  reset = () => {
    this.setState({...this.state, index: 4, steps: 0 });
    
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left" && this.state.index != 0 && this.state.index != 3 && this.state.index != 6){
      this.setState({...this.state, message: ""})
        return this.state.index - 1
    }
    else if (direction === "right" && this.state.index != 2 && this.state.index != 5 && this.state.index != 8){
      this.setState({...this.state, message: ""})
        return this.state.index + 1
    }
    else if (direction === "up" && this.state.index != 0 && this.state.index != 1 && this.state.index != 2){
      this.setState({...this.state, message: ""})
       return this.state.index - 3
    }
    else if (direction === "down" && this.state.index != 6 && this.state.index != 7 && this.state.index != 8){
      this.setState({...this.state, message: ""})
       return this.state.index + 3
    }
    else {
        this.setState({...this.state, message: `You can't go ${direction}`})
       return null
    }
  }

  count(number){
      if(number === null){
        return this.state.index
      }else{
        this.setState({...this.state, index: number, steps: (this.state.steps + 1)})
      }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
       this.count(this.getNextIndex(evt.target.id)) 
  }

  setXY = () => {
    this.setState({...this.state, })
    console.log(this.state.x, this.state.y);
  }

   componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.setState({...this.state,  x:this.setX(), y:this.setY() })
    }
  }
  

  onChange = (evt) => {
    evt.preventDefault()
    this.setState({...this.state, email: evt.target.value})
    console.log(this.state.email)
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    
    axios.post('http://localhost:9000/api/result', this.state)
    .then(res => this.setState({...this.state, message: res.data.message, email:''}))
    .catch(err => console.log(err))

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {`(${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right"onClick={this.move}  >RIGHT</button>
          <button id="down" onClick={this.move} >DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
