import React, {useState, useEffect} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = '(2,2)'
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


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [data, setData] = useState(initialState)
  
  function setX(){
    if(data.index === 0){
      return 1
      
    }
    else if(data.index === 1){
       return 2
      
    }
    else if(data.index === 2){
      return 3
      
    }
    else if(data.index === 3){
     return 1
    }
    else if(data.index === 4){
      return initialX
    }
    else if(data.index === 5){
       return 3
    }
    else if(data.index === 6){
      return 1
    }
    else if(data.index === 7){
      return 2
    }
    else if(data.index === 8){
       return 3
    }
  }

  
  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(data.index === 0){
      return "(1,1)"
    }
    else if(data.index === 1){
      return"(2,1)"
    }
    else if(data.index === 2){
      return "(3,1)"
    }
    else if(data.index === 3){
      return "(1,2)"
    }
    else if(data.index === 4){
       return initialMessage
    }
    else if(data.index === 5){
      return "(3,2)"
    }
    else if(data.index === 6){
      return"(1,3)"
    }
    else if(data.index === 7){
      return "(2,3)"
    }
    else if(data.index === 8){
      return "(3,3)"
    }
    else{ return null }
  }
  
  
  
  function setY(){
    if(data.index === 0){
      return 1
      
    }
    else if(data.index === 1){
       return 1
      
    }
    else if(data.index === 2){
      return 1
      
    }
    else if(data.index === 3){
     return 2
    }
    else if(data.index === 4){
      return initialY
    }
    else if(data.index === 5){
       return 2
    }
    else if(data.index === 6){
      return 3
    }
    else if(data.index === 7){
      return 3
    }
    else if(data.index === 8){
       return 3
    }
  }

  useEffect(() => {
    setData({...data, x:setX(), y:setY()})}, [data.index])

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setData({...data, index: 4, steps: 0})
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "left" && data.index != 0 && data.index != 3 && data.index != 6){

       return data.index - 1
   }
   else if (direction === "right" && data.index != 2 && data.index != 5 && data.index != 8){
     
       return data.index + 1
   }
   else if (direction === "up" && data.index != 0 && data.index != 1 && data.index != 2){
     
      return data.index - 3
   }
   else if (direction === "down" && data.index != 6 && data.index != 7 && data.index != 8){
      return data.index + 3
   }
   else {
      return null
   }
  }
  function count(number){
    if(number === null){
      return data.index
    }
    else{
      setData({...data, index: number, steps: (data.steps + 1)})
    }
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    count(getNextIndex(evt.target.id))
    

  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    evt.preventDefault()
    setData({...data, email: evt.target.value});
    console.log(data.email)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    axios.post('http://localhost:9000/api/result', data)
    .then(res => setData({...data, message: res.data.message}))
    .catch(err => console.log(err))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${data.x}, ${data.y})`}</h3>
        <h3 id="steps">You moved {data.steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === data.index ? ' active' : ''}`}>
              {idx === data.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{data.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}  >LEFT</button>
        <button id="up"onClick={move} >UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={data.email} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
