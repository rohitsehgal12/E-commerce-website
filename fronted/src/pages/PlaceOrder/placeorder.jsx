import React, { useContext, useEffect, useState } from 'react'
import './placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Placeorder = () => {

  const { getTotalcartAmount, token, food_list, cartItem, url } = useContext(StoreContext)
  //use to store data in placeorder time info
  // if (!cartItem ) {
  //   console.error("Missing cartItems or food_list");
  //   return;
  // }
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    // page reload na ho submit karte time
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    // console.log(orderItems);
    
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalcartAmount()+2,
    }
    // console.log(orderData);
    
    
    // console.log("FULL URL →", `${url}/api/order/place`);

    //hamesha yaad rakhna / ka
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    // await axios.post(`${url}api/order/place`, orderData, { headers: { token } });

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);

    }
    else{
      alert("error")
    }
    
    
    

  }
  const navigate = useNavigate();

   useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalcartAmount()===0){
         navigate('/cart')
    }
   },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalcartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{getTotalcartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>&#8377;{getTotalcartAmount() === 0 ? 0 : getTotalcartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder