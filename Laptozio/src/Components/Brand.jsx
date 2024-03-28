/* eslint-disable no-unused-vars */
import React from 'react'

const Brand = () => {
    const Brands = [
        {
            brandName: "Apple",
            logo: "https://www.layers.shop/cdn/shop/files/Untitled-1_0002_Symbol-of-the-iPhone-logo.jpg?v=1673873290"
        },
        {
            brandName: "Vivo",
            logo: "https://www.layers.shop/cdn/shop/files/Untitled-1_0002_Symbol-of-the-iPhone-logo.jpg?v=1673873290"
        },
        {
            brandName: "Apple",
            logo: "https://www.layers.shop/cdn/shop/files/Untitled-1_0002_Symbol-of-the-iPhone-logo.jpg?v=1673873290"
        },
        {
            brandName: "Apple",
            logo: "https://www.layers.shop/cdn/shop/files/Untitled-1_0002_Symbol-of-the-iPhone-logo.jpg?v=1673873290"
        },
        {
            brandName: "Apple",
            logo: "https://www.layers.shop/cdn/shop/files/Untitled-1_0002_Symbol-of-the-iPhone-logo.jpg?v=1673873290"
        },
    ]
  return (
    <div>
        <div className="brand-container my-7 mx-24">
            <h3 className='text-center text-3xl font-bold mb-4'>Select Your Brand</h3>
            <div className="brands grid grid-rows-1 grid-flow-col gap-4 hover:">

            {
                Brands.map((brand, index)=>(
                    <div key={index} className="brand w-36 cursor-pointer">
                    <img className='w-36 rounded-full border-2' src= {brand.logo} alt="" />
                    <h3 className='text-center'>{brand.brandName}</h3>
                </div>
                ))
            }
              
            </div>
        </div>
    </div>
  )
}

export default Brand
