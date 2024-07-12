import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../style/ETC/InfiniteSlider.scss";
import light001 from "../../style/img/light001.png";
import light002 from "../../style/img/light002.png";
import light003 from "../../style/img/light003.png";
import light004 from "../../style/img/light004.png";
import dark005 from "../../style/img/dark005.png";
import dark006 from "../../style/img/dark006.png";
import dark007 from "../../style/img/dark007.png";
import dark008 from "../../style/img/dark008.png";
import { GrNext, GrPrevious } from "react-icons/gr";

const CustomArrow = ({ className, style, onClick, isDarkMode}) => (
  <div
    className={className}
    style={{
      ...style,
      color: isDarkMode ? 'white' : 'black',
      cursor: 'pointer',
      zIndex: 1
    }}
    onClick={onClick}
  >
    {className.includes('slick-prev') ? (
      <GrPrevious />
    ) : (
      <GrNext />
    )}
  </div>
);

const InfiniteSlider = ({ isDarkMode }) => {
  const images = isDarkMode
    ? [dark005, dark006, dark007, dark008]
    : [light001, light002, light003, light004];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    nextArrow: <CustomArrow className="slick-next" isDarkMode={isDarkMode}/>,
    prevArrow: <CustomArrow className="slick-prev" isDarkMode={isDarkMode}/>,
  };

  return (
    <div className={`Slider-dev ${isDarkMode ? 'dark-mode' : ''}`}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfiniteSlider;
