// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import {useState} from 'react'

function Greeting({greeting = 'whoever you are'}) {
  const [name, setName] = useState(greeting)
  // 💣 delete this variable declaration and replace it with a React.useState call

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <strong>Hello {name}</strong>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
