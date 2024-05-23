import React, { useState } from "react";
import loginimage from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { IconBase } from "react-icons/lib";
import { Link,useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast, { Toaster } from 'react-hot-toast';
const SignUp = () => {
    const navigate=useNavigate();
  const [showpwd, setpwd] = useState(false);
  const [showconfpwd, setconfpwd] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassWord: "",
    image:""
  });
  
  const showfunc = () => {
    setpwd((prev) => !prev);
  };
  const showconffunc = () => {
    setconfpwd((prev) => !prev);
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
  const handleUploadImage=async(e)=>{
     const data=await ImagetoBase64(e.target.files[0])
     setData((prev)=>{
        return{
            ...prev,
            image:data
        }
     })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {firstName,email,password,confirmPassWord}=data;

    if(firstName&&email&&password&&confirmPassWord){
        if(password===confirmPassWord){
          const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}signup`,{
            method:"POST",
            headers:{
              "content-type":"application/json",
            },
            body:JSON.stringify(data)
          })
          
            const dataRes=await fetchData.json()
            console.log(dataRes)
            
            toast(dataRes.message)
            if(dataRes.alert){
              navigate('/login')
            }
            
            
        }else{
            alert("password mismatch");
        }
    }
    else{
        alert("enter all fields")
    }
  }
  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md mt-2 relative ">
          <img src={data.image?data.image:loginimage} className="w-full h-full" />
          <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-25 w-full text-center cursor-pointer">
            <p className="text-sm p-1 text-white">Upload</p>
          </div>
          <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadImage}/>
          </label>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">FirstName</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-sm focus-within:outline-blue-200 "
          />

          <label htmlFor="lastName">LastName</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            className=" mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-sm focus-within:outline-blue-200"
          />

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

          <label htmlFor="confirmpassword">ConfirmPassword</label>
          <div className="flex mt-1 mb-2 w-full bg-slate-100 px-2 py-1 rounded-sm outline-none focus-within:outline-blue-200 ">
            <input
              type={showconfpwd ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassWord"
              value={data.confirmPassWord}
              onChange={handleChange}
              className="w-full bg-slate-100 border-none outline-none"
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={showconffunc}
            >
              {showconfpwd ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="mt-6 w-full bg-blue-400 max-w-[100px] m-auto cursor-pointer hover:bg-blue-400 rounded-lg text-xl text-white font-medium ">
            SignUp
          </button>
        </form>
        <p>
          Already have account?
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
