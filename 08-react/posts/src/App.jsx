
import './App.css'
import {Posts} from './components/Posts.jsx'
import { Autor } from './components/Autor.jsx'
import {Tasks} from './components/Tasks.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="autor/:id" element={<Autor/>}></Route>
        <Route path="autor/tasks/:id" element={<Tasks/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
