
import React, { useEffect, useState } from 'react'
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/LayOut/LayOut"
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/Product/ProductCard';
import axios from 'axios';
import productUrl from '../../Api/EndPoints';
import Loader from '../../Components/Loader/Loader';

const ProductDetail = () => {
  const {productId} = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  console.log(productId);

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false)
    })
  }, [productId]);

  return (
    <Layout>
      {isLoading?(<Loader/>):(<ProductCard
        product={product}
        flex ={true}
        renderDesc ={true}
        renderadd={true}
      />)}
      
    </Layout>
  )
}

export default ProductDetail