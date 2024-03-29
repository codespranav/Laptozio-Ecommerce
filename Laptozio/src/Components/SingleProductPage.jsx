import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { RiHeartFill } from 'react-icons/ri'; // Changed to RiHeartFill for heart icon

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // calculate discount percentage
  function calculateDiscount(listPrice, actualPrice){
    let discountPrice = (listPrice - actualPrice)/listPrice * 100;
    return Math.round(discountPrice);
  };
  return (
    <div className="p-12">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="flex flex-col md:flex-row">
            <img
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0 mr-4"
              src= {`http://localhost:5000/api/product/get-photo/${productId}`}
            
              alt="Product Image"
            />
            <img
              className="w-full md:w-1/2 h-auto mb-4 md:mb-0 mr-4"
              src= {`http://localhost:5000/api/product/get-photo/${productId}`}
            
              alt="Product Image"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-3">{product.product_name}</h1>
            <p className="text-lg mb-4">{product.description ? product.description : "lorem ipsum dolor sit amet"}</p>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-green-700 mr-2">₹{product.actual_price}</h2>
              <p className="text-lg text-gray-500">
                MRP <strike>₹{product.discounted_price}</strike>
              </p>
              <p className="text-lg ml-2 text-red-500">{calculateDiscount(product.actual_price, product.discounted_price)}% OFF</p>
            </div>
            <p className="text-gray-600 mb-4">Inclusive of all taxes</p>
            <div className="flex space-x-4">
              <button className="flex items-center border-2 border-red-500 text-red-500 py-2 px-4 rounded-md">
                <FaShoppingCart className="mr-2" /> ADD TO CART
              </button>
              <button className="flex items-center bg-red-500 text-white py-2 px-4 rounded-md">
                <RiHeartFill className="mr-2" /> BUY NOW
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>No Product Details Found!</h1>
      )}
    </div>
  );
};

export default SingleProductPage;
