import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from "./Product.module.css"
import Loader from '../Loader/Loader';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error);
        isLoading(false)
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
    {
      isLoading?(<Loader/>) : (<section className={classes.products_container}>
        {products?.map((singleProduct) => (
          <ProductCard  renderadd={true} product={singleProduct} key={singleProduct.id} />
        ))}
      </section>)
    }
      
    </>
  );
}

export default Product;