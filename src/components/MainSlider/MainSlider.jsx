import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/imgs/41nN4nvKaAL._AC_SY200_.jpg";
import img2 from "../../Assets/imgs/61cSNgtEISL._AC_SY200_.jpg";
import img4 from "../../Assets/imgs/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import img5 from "../../Assets/imgs/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="row gx-0 my-5 d-flex justify-content-center">
        <div className="col-md-3">
          <Slider {...settings}>
            <img height={400} src={img1} alt="" />
            <img height={400} src={img2} alt="" />
          </Slider>
        </div>

        <div className="col-md-3">
          <img height={200} className="w-100" src={img4} alt="" />
          <img height={200} className="w-100" src={img5} alt="" />
        </div>
      </div>
    </>
  );
}
