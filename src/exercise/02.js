// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import { useEffect, useRef, useState } from 'react'

export const useLocalStorageState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const localStorageValue = window.localStorage.getItem(key)
    if (localStorageValue) return JSON.parse(localStorageValue)
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) window.localStorage.removeItem(prevKey)
    prevKeyRef.current = key
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, prevKeyRef, value])

  return [value, setValue]
}

function Greeting({ initialName = '' }) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  const [name, setName] = useLocalStorageState('name', initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
