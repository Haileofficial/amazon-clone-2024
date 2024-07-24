
import React from 'react';
import styles from './Footer.module.css';



const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Get to Know Us</h3>
          <ul className={styles.columnList}>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Amazon</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Amazon Devices</a></li>
            <li><a href="#">Amazon Science</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Make Money with Us</h3>
          <ul className={styles.columnList}>
            <li><a href="#">Sell products on Amazon</a></li>
            <li><a href="#">Sell on Amazon Business</a></li>
            <li><a href="#">Sell apps on Amazon</a></li>
            <li><a href="#">Become an Affiliate</a></li>
            <li><a href="#">Advertise Your Products</a></li>
            <li><a href="#">Self-Publish with Us</a></li>
            <li><a href="#">Host an Amazon Hub</a></li>
            <li><a href="#">See More Make Money with Us</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Amazon Payment Products</h3>
          <ul className={styles.columnList}>
            <li><a href="#">Amazon Business Card</a></li>
            <li><a href="#">Shop with Points</a></li>
            <li><a href="#">Reload Your Balance</a></li>
            <li><a href="#">Amazon Currency Converter</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Let Us Help You</h3>
          <ul className={styles.columnList}>
            <li><a href="#">Amazon and COVID-19</a></li>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Your Orders</a></li>
            <li><a href="#">Shipping Rates & Policies</a></li>
            <li><a href="#">Returns & Replacements</a></li>
            <li><a href="#">Manage Your Content and Devices</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </div>
      </div>
      <br/><br/><br/>
      <hr/>
      <div className={styles.copyright}>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" className={styles.logo} />
        <div className={styles.imageContainer}>
            
              <select className={styles.title}>
              
                <option value= "">English</option>
              </select>
            <option value= "" className={styles.title}> $ USD-U.S. Dollar</option>
            <option value= "" className={styles.title}> United State</option>
        </div>
      </div>
    </footer>
  );
};

export default Footer;