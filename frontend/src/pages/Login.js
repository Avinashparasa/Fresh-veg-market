import React, { useState } from "react";
import loginimage from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { IconBase } from "react-icons/lib";
import { Link ,useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const navigate=useNavigate();
  const [showpwd, setpwd] = useState(false);
  
  const [data, setData] = useState({
   
    email: "",
    password: "",
    
  });
  

  const userData=useSelector(state=>state)
  //console.log(userData.user);

  const dispatch=useDispatch()
  const showfunc = () => {
    setpwd((prev) => !prev);
  };
  
  const handleChange=(e)=>{
    console.log(e.target);
    const {name,value}=e.target
    setData((prev)=>{
        return{
            ...prev,
            [name]:value
        }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {email,password}=data;

    if(email&&password){
        
      const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}login`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify(data)
      })
      console.log("hi there")
        const dataRes=await fetchData.json()
        //console.log(dataRes)
        
        toast(dataRes.message)

        if(dataRes.alert){
          dispatch(loginRedux(dataRes))
          setTimeout(()=>{
            navigate("/")
          },1000)
          console.log(userData)
        }
    }
    else{
        alert("enter all fields")
    }
  }
  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md mt-2">
          <img src={loginimage} className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounemail focus-within:outline-blue-200"
          />

          <label htmlFor="password">Password</label>
          <div className="flex mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-sm outline-none focus-within:outline-blue-200 ">
            <input
              type={showpwd ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full bg-slate-100 border-none outline-none"
            />
            <span className="flex text-xl cursor-pointer" onClick={showfunc}>
              {showpwd ? <BiShow /> : <BiHide />}
            </span>
          </div>

          

          <button className="mt-6 w-full bg-blue-400 max-w-[100px] m-auto cursor-pointer hover:bg-blue-400 rounded-lg text-xl text-white font-medium ">
            Login
          </button>
        </form>
        <p>
          Don't have account?
          <Link to="/signup" className="text-blue-400">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login