import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // If you're using react-router
import Home from './components/Home';
import RestaurantReviews from './components/RestaurantReviews';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* Your route components go here */}
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/restaurants/:restaurantId" element={<RestaurantReviews />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
