/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MainLayout from '../Components/Layout/MainLayout'
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignup = async (e)=>{
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:5000/api/auth/register", {name, email, password})
      console.log(res);
    } catch (error) {
        console.log("Error" + error);
    }
  }
  return (
    <MainLayout>
      <div className="login-container h-5/6 my-10 p-6 md:p-0">
            <h2 className='text-center my-8 text-4xl font-bold'>User Registration</h2>
            <div className="form flex flex-col max-w-xl m-auto  ">
                <form action="" onSubmit={userSignup} className='flex flex-col h-96'>
                    <input className='my-4 h-16 p-2 outline-none border-2 text-black' type="text" name="" id="name" placeholder='Enter Full Name' autoComplete='false' value={name} onChange={(e)=> setName(e.target.value)} required/>
                    <input className='my-4 h-16 p-2 outline-none border-2 text-black' type="email" name="" id="email" placeholder='Email' autoComplete='false' value={email} onChange={(e)=> setEmail(e.target.value)}  required/>
                    <input className='my-4 h-16 p-2 outline-none border-2 text-black' type="password" name="" id="password" placeholder='Password' autoComplete='false' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    <div className="password-helper">
                        <p className='text-sm text-end cursor-pointer'> <a href="/forgot-password">Forgot Password?</a></p>
                    </div>
                    <button type='submit' className='btn bg-red-800 text-white p-4 my-4'>Create Account</button>
                </form>
            </div>

            <div className="new-customer">
                <p className='text-center text-lg'>Existing Customer? <a href="/signup" className='text-blue-800 font-normal'>Login Now</a></p>
            </div>
      </div>
    </MainLayout>
  )
}

export default Signup
