import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route,Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify';


const App = () => {

   const url= "https://e-commerce-website-backend-s3kd.onrender.com"
  return (
    <div>
      <ToastContainer/>
    <Navbar/>
    <hr />
    <div className="app-content">
      <Sidebar/>
        {/* iska use pages add karne ke liye kiya jata h */}
      <Routes>

        <Route path="/add" element={<Add url={url}/>} />
        <Route path="/list" element={<List url={url}/>} />
        <Route path="/orders" element={<Order url={url}/>} />

      </Routes>
      
    </div>
    </div>
  )
}

export default App
