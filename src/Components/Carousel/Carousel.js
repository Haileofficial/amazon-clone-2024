import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./Image/data";
import styles from './Carousel.module.css';

const ResponsiveCarousel = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        transitionTime={500}
        stopOnHover={false}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        {
          img.map((imageItemLink, index) => (
            <div key={index}>
              <img src={imageItemLink} />
            </div>
          ))
        }
      </Carousel>
      <div className={styles.hero_img}></div>
    </div>
  );
};

export default ResponsiveCarousel;