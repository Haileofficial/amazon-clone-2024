
import React from 'react';
import categoryInfo from './CatagoryInfo';
import CatagoryCard from './CatagoryCard';
import classes from "./Category.module.css"
const Category = () => {
  return (
    <section className={classes.catagory_container}>
      {categoryInfo.map((info) => (
        <CatagoryCard key={info.name} data={info} />
      ))}
    </section>
  );
};

export default Category;