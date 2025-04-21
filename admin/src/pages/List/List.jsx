import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"


const List = ({url}) => {
  // const url  = "http://localhost:4000"
  const [list,setList]=useState([]);
  

  const fetchList = async()=>{
    //iska use backend ko call karta h
    const response = await axios.get(`${url}/api/food/list`)
    // console.log(response.data);
    // console.log(list.image);
    
    
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }
  //iska use tab hota jab kisse functon ko cosole me check karna ho
  useEffect(()=>{
       fetchList();
  },[])
   

  const removeFood = async(foodId) =>{
    // foodId ki value onclick se aa rhi h
    // console.log(foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    //iska use dubar isliye kiya ki remove hone ke baad usse display se hta dega 
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }



  return (
    <div className='list add flex-col'>

    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>category</b>
        <b>Price</b>
        <b>Action</b>

      </div>
      {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
              
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              
            </div>
          )
      })}
    </div>
    </div>
  )
}

export default List