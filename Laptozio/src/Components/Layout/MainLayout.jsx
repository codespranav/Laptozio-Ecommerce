/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = (props) => {
  return (
    <div>
        <Header/>
          <ToastContainer/>
          {props.children}
        <Footer/>
    </div>
  )
}

export default MainLayout
