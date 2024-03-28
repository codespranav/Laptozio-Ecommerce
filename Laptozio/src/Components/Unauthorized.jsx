/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import MainLayout from './Layout/MainLayout'
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import loading from '../assets/loading.gif'
const Unauthorized = ({path = "login"}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(5);
  useEffect(()=>{
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000); 
    // count === 0 &&  navigate(`/${path}`, {
    //     state: location.pathname
    // });

    count === 0 &&  navigate(`/${path}`, {
      state: location.pathname,
    });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, path, location.pathname]);
  return (
    <MainLayout>
      <div className="unauthorized-container h-full flex items-center justify-center">
          {/* <h1 className='text-center text-red-900 text-2xl font-bold p-4'>Unauthorized Access {count}</h1> */}
    <img src={loading} alt="" className='w-20 h-20'/>
      </div>
    </MainLayout>
  )
}

export default Unauthorized
