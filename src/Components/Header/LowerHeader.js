import React from 'react';
import styles from './LowerHeader.module.css';
// import { IoMenuSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";


const LowerHeader = () => {
  return (
    <div className={styles.lowerHeader}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${styles.firstNavItem}`}>
          <div className={styles.allMenu}>
            < LuMenu size={20} />
            <p >All</p>
          </div>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Today's Deals
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Customer Service
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Registry
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Gift cards
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Sell
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LowerHeader;