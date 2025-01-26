import { useState } from 'react'
import './App.css'
import {Posts} from './Posts.jsx'

function App() {
  const [posts, actualizarPost] = useState([]);

  return (
    <>
      <Posts/>
    </>
  )
}

export default App
