import React, { useState } from 'react'
import logo from "../assest/logo.png"
import {BsCartFill} from "react-icons/bs";
import {FaUserAlt} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import {toast} from "react-hot-toast";
const Header=()=> {
    const dispatch=useDispatch()
    const [handlepo,setHandle]=useState(false);
    const userData=useSelector((state)=>state.user)
    const handle=()=>{
       setHandle(prev=>!prev);
    }
    const handlelogout=()=>{
        dispatch(logoutRedux())
        toast("Logout Successfully")
    }
    const cartItemNumber=useSelector((state)=>state.product.cartItem)
  return (
    <header className='fixed shadow-md w-full h-16 flex justify-between  bg-white'>
       
       <div className='text-2xl font-bold text-black-300 py-2  border-2 md:text-4xl '  >
                Amicus 
        </div>
        
        <div className='flex items-center gap-5  md:gap-16 border-2 '>
            <div className=' gap-10 hidden md:flex'>
               <Link to="/" className=''>
                Home
               </Link>
               <Link to="/menu/664c35da80a439c96cc0bb92" >
                Menu
               </Link>
               <Link to="/about" className=''>
                About
               </Link>
               <Link to="/contact" className=''>
                Contact
               </Link>
            </div>
            <div className='text-slate-700 text-2xl relative'>
               <Link to={"cart"}> <BsCartFill/>
                <div className=' rounded-full w-4 h-5 absolute -top-1 -right-1 bg-slate-400  text-sm  text-center'>{cartItemNumber.length}</div>
                </Link>
            </div>
            <div className='cursor-pointer text-slate-700 ' onClick={handle}>
                <div className='w-10 h-10'>
                {userData.image?<img src={userData.image} className='h-full w-full rounded-full overflow-hidden drop-shadow' />:<FaUserAlt  className='h-full w-full rounded-full overflow-hidden drop-shadow'/>}
                </div>
                {handlepo&&<div className=' absolute  right-2 shadow-lg bg-white  drop-shadow-lg   py-2 px-2 min-w-[100px] md:min-w-0 text-center'>
                    {
                        process.env.REACT_APP_ADMIN_EMAIL===userData.email&&<p><Link to="/newproduct" className='whitespace-nowrap'>New product</Link></p>
                    }
                    
                    {
                        userData.image?<p className='cursor-pointer' onClick={handlelogout}>Logout ({userData.firstName})</p>:<Link to="/login" className='whitespace-nowrap'>Login</Link>
                    }
                    <div className=' gap-4 mt-2 flex flex-col md:hidden'>
                   <Link to="/" className=''>
                      Home
                     </Link>
                     <Link to="/menu/664c35da80a439c96cc0bb92" >
                      Menu
                     </Link>
                     <Link to="/about" className=''>
                      About
                     </Link>
                     <Link to="/contact" className=''>
                      Contact
                     </Link>
            </div>
                    
                    
                </div>
                }
            </div>
        </div>
    </header>
  )
}

export default Header;

