import React, { useContext } from 'react';
import { Rating } from '@mui/material';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from "./Product.module.css";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import actionTypes from '../../Utility/action.type';

function ProductCard({ product,flex,renderDesc, renderadd }) {
  const {image, title,id, rating, price,description } = product;
  
  const [state, dispatch]= useContext(DataContext)
  
  console.log(state)
  
  const addToCart = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        image,title,id,rating,price,description 
      }
    });
  };
  
  
  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt='' />
      </Link>
      <div className={classes.description_container}>
        <h3>{title}</h3>
        {renderDesc && <div>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          {rating && rating.rate ? (
            <Rating value={rating.rate} precision={0.1} />
          ) : (
            <Rating value={0} precision={0.1} readOnly />
          )}
          {/* count */}
          {rating && rating.count && <small>{rating.count}</small>}
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderadd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );



}

export default ProductCard;