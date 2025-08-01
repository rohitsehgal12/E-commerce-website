import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"



const LoginPopup = ({setShowLogin}) => {

    const{url,setToken} = useContext(StoreContext)


    const [currState,setCurrState] = useState("Login")
    

    //ye backend ka h
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

     //ye ectract karne ke liye
    const onchangeHandler = (event)=>{
           const name = event.target.name;
           const value = event.target.value;
           setData(data=>({...data,[name]:value}))
    }
    // useEffect(()=>{
    //   console.log(data);
      
    // },[data])


    const onLogin = async (event)=>{
        //iska use karke page reload nhi karega 
             event.preventDefault()
       
             let newUrl = url;
             if(currState==="Login"){
                  newUrl += "/api/user/login"
             }
             else{
                newUrl += "/api/user/register"
             }

             const response = await axios.post(newUrl,data);
             if (response.data.success) {
                  setToken(response.data.token);
                  localStorage.setItem("token",response.data.token);
                  setShowLogin(false)
                
             }
             else{
                alert(response.data.message)
             }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onchangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                <input name='password' onChange={onchangeHandler} value={data.password} type="password" placeholder='Password' required />
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing , i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            : <p>Aleardy have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
            
           
        </form>
        </div>
  )
}

export default LoginPopup