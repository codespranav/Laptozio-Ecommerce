/* eslint-disable no-unused-vars */

import React from 'react'
import MainLayout from '../Components/Layout/MainLayout'
import HeroSection from '../Components/HeroSection'
import Brand from '../Components/Brand'
import Products from '../Components/Home/Products'

const Home = () => {
  return (
    <MainLayout>
      <HeroSection/>
      <Brand/>
      <Products/>
    </MainLayout>
  )
}

export default Home
