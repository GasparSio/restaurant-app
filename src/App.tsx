import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import LogIn from './pages/Login'
import Restaurants from './pages/Restaurants'
import RestaurantDetail from './pages/RestaurantDetail'
import NewRestaurant from './pages/CreateRestaurant'
import Layout from './pages/Layout'

function App() {
  //Define the routes
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/singin' element={<SingIn />} />
        <Route path='/login' element={< LogIn/>} />
        <Route element={<Layout />} >
          <Route path='/restaurants' element={<Restaurants />} />
          <Route path='/restaurantdetail' element={<RestaurantDetail />} />
          <Route path='/newrestaurant' element={<NewRestaurant />} />
        </Route>
        <Route path='*' element={<Home />} />
      </Routes>
  )
}

export default App
