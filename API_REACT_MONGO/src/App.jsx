import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Objetos} from './Objetos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Objetos/>
    </>
  )
}

export default App
