import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const FoodItem = ({ id, name, price, description, image }) => {

    // const [itemCount,setItemCount] = useState(0)
    const { cartItem, addToCart, removeFromCart,url } = useContext(StoreContext)

    return (
        <div className='food-item' >
            <div className="food-item-img-container">
                <img className='food-item-image' src={url+"/images/"+image} alt="" />





                {/* YE + KARNE KE LIYE USE KIYA H OR + - MEANS KITNE QUNTITIY LE RHE HO */}
                {/* {!itemCount
                ?<img className='add' onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_white} alt="" />
                :<div className="food-item-counter">

                    <img onClick={()=>setItemCount(prev=>prev-1)} src={assets.remove_icon_red} alt="" />
                    <p>{itemCount}</p>
                    <img  onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_green} alt="" />
                </div>
            } */}



                {!cartItem[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                    : <div className="food-item-counter">

                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItem[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>

        </div>
    )
}

export default FoodItem