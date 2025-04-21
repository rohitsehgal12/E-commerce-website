import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//add
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  //use to accept react-router
 <BrowserRouter>
 <App />
 </BrowserRouter>

  
)
