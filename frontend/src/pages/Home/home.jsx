import React, { useState } from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'


const Home = () => {
    //    iska use karke hum img active kar sakte h
    // and iska use karke hum value pahucha rha ha exploremenu me
    // isme kya hota ki category by default all pe hogi and setCategory ka use karke hum uski state change kar sakte hai
    const [category,setCategory]=useState("All");

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory}/>
            <FoodDisplay  category={category}/>
            <AppDownload/>
        </div>
    )
}

export default Home
