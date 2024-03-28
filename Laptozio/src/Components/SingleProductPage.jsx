import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
const SingleProductPage = () => {
const {productId} = useParams();
const [product, setProduct] = useState(null);
useEffect(()=>{
    const fetchProductsDetails = async ()=>{
        try {
            const response = await axios.get(`http://localhost:5000/api/product/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }
    fetchProductsDetails();
}, [productId])
  return (
    <div>
    {product? <h1>{product.product_name}</h1> : <h1>No Product Details Found!</h1>}
    </div>
  )
}

export default SingleProductPage
