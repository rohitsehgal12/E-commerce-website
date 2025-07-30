import React from 'react'
import './ExploreMenu.css'
// ye import fronted_assest me js file li h
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category,setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. our mission ,one meal at a time</p>

            {/*  iska use menu_list se item nikalne ke liye  */}
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    {/* ISS PROPERTY KA USE KARKE HUM JABCLICK KARENGE WORD PE TAB IMG ME CHANGING AAYGI */}
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu