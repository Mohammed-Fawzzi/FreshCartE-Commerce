import React from "react";
import { Helmet } from "react-helmet";
import axios, { Axios } from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Categories() {
  function getCats() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading } = useQuery("pcats", getCats);

  return (
    <div className="">
      <Helmet>
        <title>
          Categories
        </title>
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
        <div className="d-flex justify-content-between flex-wrap pb-4">
          {data?.data.data.map((cat, idx) => {
            return (
              <div
                className="w-31 border m-3  flex-grow-1 flex-xl-grow-0 rounded-3 "
                key={idx}
              >
                <img
                  height={300}
                  className="w-100 cate-imag"
                  src={cat.image}
                  alt=""
                />
                <h3 className="text-center text-main my-4">{cat.name}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
