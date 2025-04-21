import React from 'react'
//add
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div>
        <div className="navbar">
            {/* <img src="" isse htake {} iska use karenge bcz hum kisse file se le rhe h alt="" /> */}
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    </div>
  )
}

export default Navbar