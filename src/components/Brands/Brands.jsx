import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Brands() {
  function getbrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isLoading } = useQuery("brands", getbrands);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
       <div className=".containerr text-center bg-dark vw-100 bg-opacity-10 position-absolute start-0  vh-100 d-flex justify-content-center align-items-center ">
       <div className="loading-spinner">
         <BallTriangle
           height={100}
           width={100}
           radius={5}
           color="#4fa94d"
           ariaLabel="ball-triangle-loading"
           wrapperStyle={{}}
           wrapperClass=""
           visible={true}
         />
       </div>
     </div>
      ) : (
        <div className="container bran-main">
          <h1 className="text-main text-center m-3 pb-4 brands-t">
            All Brands
          </h1>
          <div className="row">
            {data?.data.data.map((brand, idx) => {
              return (
                <div
                  className="col-md-3 col-sm-6 col-lg-3 border mb-3 rounded-3 bran-l"
                  key={idx}
                >
                  <img className=" w-100" src={brand.image} alt="" />
                  <h3 className="text-center text-main my-4">{brand.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
