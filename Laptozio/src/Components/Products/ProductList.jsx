import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainLayout from '../Layout/MainLayout';
import Filter from '../Filter';

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/product/product/${category}`);
      console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle the error or show a message to the user
      toast.error('Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <MainLayout>
      <div className="prod-container h-full px-4 flex">
        <div className="filter-cont">
          <Filter/>
        </div>
        <div className="main">
   
        <h1 className="p-4 font-bold text-2xl text-center">Search Products: {category}</h1>
        {products.length !== 0 ? (
          <div className="flex flex-wrap">
            {products.map((items) => (
              <div key={items._id} className="boxes w-48 md:w-64 mr-20 p-4 shadow-lg">
                <img
                  src={`http://localhost:5000/api/product/get-photo/${items._id}`}
                  alt="Product"
                  className="w-full p-5 rounded-lg"
                />
                <h3 className="text-base font-medium mt-4">{items.product_name}</h3>
                <div className="price flex items-center gap-4">
                  <span className="text-xl font-bold">₹ {items.actual_price}</span>
                  <span className="text-md text-red-700">
                    <strike>₹ {items.discounted_price}</strike>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-center">No Products</h1>
        )}
      </div>
</div>
    </MainLayout>
  );
};

export default ProductList;
