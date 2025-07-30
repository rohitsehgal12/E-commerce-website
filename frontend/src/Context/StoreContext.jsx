import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null)
import axios from "axios"

const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    //backend 
    const url = "http://localhost:4000"
    const [token,setToken]= useState("");
    const[food_list,setFoodList]= useState([])

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            
        }
    }


    // useEffect(() =>
    //     console.log(cartItem)
    // ), [cartItem]
    const getTotalcartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {

                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    
    //iska use se page reload karne se car ki quantity nhi htegi
     const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData);
     }


    //iska function ka use karke hum page reload karke logout nhi hoga
    useEffect(()=>{
        
         async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
             }
         }
         loadData();
    },[])

    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalcartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider