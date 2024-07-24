import React, { useContext } from 'react'
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut"
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import actionTypes from '../../Utility/action.type'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";


const Cart = () => {
  const [{basket, user}, dispatch]= useContext(DataContext);
  const total = basket.reduce((amount,item)=>{
    return item.price* item.amount + amount
  },0)
  const increment = (item) => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item
    });
  };
  
  const decrement = (id) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id
    });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hellow</h2>
          <h3>Your Shopping basket</h3>
          <hr />
          {
            basket?.length === 0 ? (<p>Opps! No item in your cart</p>) : (
              basket?.map((item, index) => {
                return (
                <section className={classes.cart_product}>
                    <ProductCard
                  key={index}
                  product={item}
                  renderDesc={true}
                  renderadd ={false}
                  flex={true}
                  />
                  <div className={classes.btn_container}>
                    <button className={classes.btn} onClick={()=>increment(item)}><IoMdArrowDropup size={30}/></button>
                    <span>{item.amount}</span>
                    <button className={classes.btn} onClick={()=>decrement(item.id)}><IoMdArrowDropdown size={30}/></button>
                  </div>
                  </section>
                  );
              })
            )
          }
          </div>
          {
            basket?.length!==0&&(
              <div className={classes.subtotal}>
                <div>
                  <p>Subtotal ({basket?.length}items)</p>
                  <CurrencyFormat amount = {total}/>
                </div>
                <span>
                  <input type='check box' className={classes.checkbox}/>
                  <small>This order contains a gift</small>
                </span>
                <Link to= "/payments">continue to checkout</Link>
              </div>
            )
          }
        
      </section>
    </LayOut>
  )
}

export default Cart