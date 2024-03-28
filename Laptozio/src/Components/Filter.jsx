import React, { useEffect, useState } from 'react';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../Prices';
import axios from 'axios';

const Filter = () => {
  const [priceFilter, setPriceFilter] = useState([]);

  const fetchFilteredProducts = async () => {
    try {
      let { prod } = await axios.get('http://localhost:5000/api/product/product-filter', {
        params: {
          priceFilter
        }
      });
      console.log('prod', prod);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (priceFilter.length) {
      fetchFilteredProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFilter]);

  return (
    <div className="w-80 h-100 p-4">
      <div className="filter-by-price">
        <h3 className="text-lg font-bold uppercase">Filter By Price</h3>
        <Radio.Group
          className="flex flex-col mt-2"
          onChange={(e) => {
            setPriceFilter(e.target.value); // Access e.target.value instead of the entire event object
          }}
        >
          {Prices.map((p) => (
            <Radio className="text-base leading-7" value={p.array} key={p._id}>
              {p.name}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div className="filter-by-cat mt-3">
        <h3 className="text-lg font-bold uppercase">Sort By</h3>
        <Radio.Group className="container flex flex-col mt-2">
          <Radio value="popularity">Popularity</Radio>
          <Radio value="lowToHigh">Price- Low to High</Radio>
          <Radio value="highToLow">Price- High to Low</Radio>
          <Radio value="newest">Newest</Radio>
          <Radio value="bestSeller">Best Seller</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Filter;
