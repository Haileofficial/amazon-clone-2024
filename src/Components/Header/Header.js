import React, { useContext } from 'react';
import styles from './Header.module.css';
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import LowerHeader from './LowerHeader';
import {auth} from "../../Utility/firebase"




function Header() {
  const [{user,basket}, dispatch]= useContext(DataContext)
  // const totalItem = basket?.reduce((amount,item)=>{
  //   return item.amount + amount
  // },0)

  const totalItem = basket ? Object.values(basket).reduce((amount, item) => {
    return item.amount + amount;
  }, 0) : 0;
  
  return (
    <section className={styles.fixed}>
    <section className={styles.header}>
      <div className={styles.headerContainer}>
        <Link  to ="/" className={styles.headerLogo}>
          <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
        </Link>
        <div className={styles.headerLocationAndSearch}>
          <div className={styles.headerLocation}>
            <span><SlLocationPin size={35} className={styles.headerLocationIcon}/></span>
            <div className={styles.headerDeliver}>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
          <div className={styles.headerSearch}>
            <select>
              <option value= ""> All</option>
            </select>
            <input type="text" placeholder="Search Amazon" />
            <button className={styles.headerSearchButton}>
              <FiSearch />
            </button>
          </div>
        </div>
        <div className={styles.headerNavigation}>
          <Link  to="/" className={styles.headerNavigation}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1024px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png" alt="/" />
            <div>
              <select>
                <option value= ""> EN</option>
              </select>
            </div>
          </Link>
          <Link to={!user && "/auth"} className={styles.headerNavLink}>
            <div>
              {
                user ? (
                  <>
                    <p>Hello, {user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>SignOut</span>
                  </>
                ) : (
                      <>
                        <p>Hello, sign in</p>
                        <select>
                          <option value="">Account & Lits</option>
                        </select>
                      </>
                )
              }
            </div>
          </Link>
          <Link  to="/orders" className={styles.headerNavLink}>
            <div className={styles.headerNavLink_returns}>
              <div>Returns</div>
              <p>& Orders</p>
            </div>
          </Link>
          <Link  to="/Cart" className={styles.headerNavLink_cart}>
            <div>
              <span>{totalItem}</span>
              <BiCart size={35}/>
            </div>
            <p>Cart</p>
          </Link>
        </div>
      </div>
    </section>
    <LowerHeader/>
    </section>
  );
}

export default Header;