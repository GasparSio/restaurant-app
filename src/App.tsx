import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SingIn from './pages/SingIn'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/singin' element={<SingIn />} />
      </Routes>
  )
}

export default App
