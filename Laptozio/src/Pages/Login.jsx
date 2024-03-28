/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import MainLayout from '../Components/Layout/MainLayout'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {toast } from 'react-toastify';
import { useAuth } from '../contexts/context';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {auth, setAuth} = useAuth();


  const navigate = useNavigate();

  const loginUser = async (e)=>{
    e.preventDefault();
    try {
      let res = await axios.post('http://localhost:5000/api/auth/login', {email, password});
      if(res.data.success){
          toast.success(res.data.message)
        navigate(location.state ||"/")
        setAuth({
          ...auth, 
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem("auth", JSON.stringify(res.data));
      }
      else{
          toast.error(res.data.message)
        }
      }  catch (error) {
        console.log(error)
    }
    
    
  }
  return (
    <MainLayout>
      <div className="login-container h-5/6 my-10 p-6 md:p-0">
            <h2 className='text-center my-8 text-4xl font-bold'>Login to Your Account</h2>
            <div className="form flex flex-col max-w-xl m-auto  ">
                <form action="" onSubmit={loginUser} className='flex flex-col h-96'>
                    <input className='my-4 h-16 p-2 outline-none border-2 text-black' type="text" name="" id="" placeholder='Email' autoComplete='off' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                    <input className='my-4 h-16 p-2 outline-none border-2 text-black' type="password" name="" id="" placeholder='Password' autoComplete='off' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    <div className="password-helper">
                        <p className='text-sm text-end cursor-pointer'> <a href="/forgot-password">Forgot Password?</a></p>
                    </div>
                    <button type='submit' className='btn bg-red-800 text-white p-4 my-4'>Login</button>
                </form>
            </div>

            <div className="new-customer">
                <p className='text-center text-lg'>New Customer? <NavLink to="/signup" className='text-blue-800 font-normal'>Signup</NavLink></p>
            </div>
      </div>
    </MainLayout>
  )
}

export default Login
