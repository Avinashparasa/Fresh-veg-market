import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import {toast} from "react-hot-toast"
const NewProduct = () => {
  const [data,setData]=useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:""
  })
  const handleOnChange=(e)=>{

    const {name,value}=e.target;

    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })

  }
  const uploadImage=async(e)=>{
    const data=await ImagetoBase64(e.target.files[0])
    setData((prev)=>{
      return{
        ...prev,
        image:data
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {name,image,category,price}=data;

    if(name&&image&&category&&price){
      const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}uploadProduct`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
  
      const fetchRes=await fetchData.json()
  
      console.log(fetchRes);
      toast(fetchRes.message)
      setData(()=>{
        return{
          name:"",
          category:"",
          image:"",
          price:"",
          description:""
        }
      })
    }
    else{
      toast("Enter all required fields")
    }
   
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name="name" className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' onChange={handleOnChange} name='category' value={data.category}>
          <option value={"other"}>Select Category</option>
          
          
          <option value={"vegetable"}>Vegetable</option>
          <option value={"fruit"}>Fruit</option>
          
          
        </select>

        <label htmlFor='image'>Image
        <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
          {
            data.image?<img src={data.image} className='h-full'/>:<span className='text-5xl'><BsCloudUpload/></span>
          }
            
            
            <input type='file' accept='image/*' onChange={uploadImage} className='hidden' id='image'/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type='text'  className='bg-slate-200 p-1 my-1' onChange={handleOnChange} name='price' value={data.price}/>
        
        <label htmlFor='description'>Description</label>
        <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none' onChange={handleOnChange} name='description' value={data.description}></textarea>

        <button className='bg-blue-400 hover:bg-blue-600 font-bold text-md text-white drop-shadow my-2'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct