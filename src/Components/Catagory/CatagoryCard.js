
import React from 'react';
import classes from "./Category.module.css"
import { Link } from 'react-router-dom';
function CatagoryCard({ data }) {
  console.log(data)   
  return (
    <div key={data.name} className={classes.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;