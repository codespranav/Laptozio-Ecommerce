/* eslint-disable no-unused-vars */
import React from 'react'
import MainLayout from './MainLayout'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-gray-200'>
      <div className="footer-container md:flex justify-between flex-row md:mx-10 md:p-8 p-4">
          <div className="col-1 my-4">
              <h3 className='text font-bold mb-2'>Vision</h3>
              <p>Creativity, Expression, & Exploration</p>
          </div>
          <div className="col-2 my-4">
              <h3 className='text font-bold mb-2'>Pages</h3>
              <ul className='leading-[2rem] text-md'>
                  <li>
                    <NavLink to = "/about-us">About Us</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/contact-us">Contact Us</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/terms-conditions">Terms & Conditions</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/privacy">Privacy Policy</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/faq">FAQ</NavLink>
                    </li>
              </ul>
          </div>
          <div className="col-3 my-4">
              <h3 className='text font-bold  mb-2'>Account Center</h3>
              <ul className='leading-[2rem] text-base'>
                  <li>
                    <NavLink to = "/login">Login</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/register">Register</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/terms-conditions">Track Order</NavLink>
                    </li>
              </ul>
          </div>
          <div className="col-4 my-4">
              <h3 className='text font-bold mb-2'>Follow Us</h3>
              <ul className='leading-[2rem] text-md'>
                  <li>
                    <NavLink to = "/login">Login</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/register">Register</NavLink>
                    </li>
                  <li>
                    <NavLink to = "/terms-conditions">Track Order</NavLink>
                    </li>
              </ul>
          </div>
      </div>
    </div>
  )
}

export default Footer
