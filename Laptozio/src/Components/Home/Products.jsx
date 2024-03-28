/* eslint-disable no-unused-vars */
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Unauthorized from '../../Components/Unauthorized';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProducts = async ()=> {
        let {data} = await axios.get("http://localhost:5000/api/product/products");
        if(data){
            console.log(data?.data);
            setProducts(data.data)
            setLoading(false)
        }
        else{
            setLoading(false)
        }
      }
     
      useEffect(()=>{
        fetchProducts();
      }, [])
  return (
    <div className="my-2 mx-2 md:my-7 md:mx-24">
 <div>

</div>

        <h3 className='text-center text-3xl font-bold my-12'>Newest Arrivals</h3>
        <div className="prod-box flex gap-7">
 {!loading ? (
          <OwlCarousel className="owl-theme" margin={8} items={4} responsive={{
            0: { items: 2 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 5 }
          }} nav>
           {products.map(item => (
  <div key={item._id} className="boxes w-48 md:w-64 md:h-72 mr-20 p-2">
    <Link to={`single-product/${item._id}`}>
      <img src={`http://localhost:5000/api/product/get-photo/${item._id}`} alt="Product" className="!w-full p-5 !h-44 rounded-lg" />
      <h3 className="text text-md font-medium mt-4">{item.product_name}</h3>
      <div className="price flex items-center gap-4">
        <span className="text-xl font-bold">₹ {item.actual_price}</span>
        <span className="text-md text-red-700"><strike>₹ {item.discounted_price}</strike></span>
      </div>
    </Link>
  </div>
))}
          </OwlCarousel>
        ) : (
          // Display Unauthorized component if there are no products
          <Loading />
        )}
        </div>
    </div>
  )
}

export default Products
