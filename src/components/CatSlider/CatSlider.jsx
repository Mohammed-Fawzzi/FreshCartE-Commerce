import React from "react";
import { Helmet } from "react-helmet";
import axios, { Axios } from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CatSlider() {
  function getCats() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("pcats", getCats);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay:true,
    slidesToShow: 6,
    slidesToScroll: 5,
    arrows:false
  };

  return (
    <>
      <Helmet>
        <title>{window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}</title>
      </Helmet>
      {/* d-none d-md-block */}
      <div className="my-5 row">
        <div className="col-md-12 cat-s">
        <Slider {...settings}>
          {data?.data.data.map((cat , idx) => {
            return (
              <div key={idx}>
                <img height={200} className="w-100" src={cat.image} alt="" /> 
                <h3 className="h5">{cat.name}</h3>
              </div>
            ) 
          })}
        </Slider>
        </div>
        </div>
    </>
  );
}
