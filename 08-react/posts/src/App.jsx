
import './App.css'
import {Posts} from './components/Posts.jsx'
import { Autor } from './components/Autor.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="autor/:id" element={<Autor/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
