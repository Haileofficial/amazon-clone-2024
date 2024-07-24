import React, { useContext, useState } from 'react';
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
import actionTypes from "../../Utility/action.type"
const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  
  const [cardError,setCardError]= useState(null)
  const[processing,setProcessing]= useState(false)

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const total = basket.reduce((amount,item)=>{
    return item.price* item.amount + amount
  },0)


  const handleChange= (e)=>{
    console.log(e);
    e?.error?.message? setCardError(e?.error?.message):setCardError("")
  }

  const handlePayment = async (e) => {
    e.preventDefault();
  
    try {
      setProcessing(true);
      // 1. Backend / functions ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const { clientSecret } = response.data;
  
      // 2. Client-side (React side) confirmation
      const {paymentIntent}  = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
        console.log(paymentIntent);
      // 3. After the confirmation ---> order Firestore database save, clear basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });
        console.log(paymentIntent.amount);

        dispatch({type:actionTypes.EMPTY_BASKET})
      setProcessing(false);
    } catch (error) {
      console.error('Error in payment:', error);
      setProcessing(false);
    }
    navigate("/orders", { state: { msg: "You have a new order" } });

  };
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>check out ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          {user && (
            <div>
              <div>{user?.email}</div>
              <div>123 react learn</div>
              <div>Chicago, IL</div>
            </div>
          )}
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                {/* card element */}
                <CardElement onChange={handleChange}/>
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display: "flex",gap:"15px"}}>
                      <p>Total Order |</p> <CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type='submit'>
                    {
                      processing?(
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12}/>
                          <p>Please wait ...</p>
                        </div>
                      ): "Pay Now"
                    }
                    
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;