import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { cartContext } from "../CartContext";
import toast from "react-hot-toast";

export default function Products() {
  let { addToCart, addToWishList, wishList, setwishList, GetWishList } =
    useContext(cartContext);
  const [wishListIds, setwishListIds] = useState([]);
  const [filterText, setfilterText] = useState("");
  async function GetWishListBridg() {
    let { data } = await GetWishList();
    if (data?.status === "success") {
      setwishList(data?.data);
      wishList?.forEach((element) => {
        setwishListIds((prevArray) => [...prevArray, element.id]);
      });
    }
  }
  useEffect(() => {
    GetWishListBridg();
  }, [wishList, wishListIds]);

  async function addToWL(id) {
    let { data } = await addToWishList(id);
    if (data?.status === "success") {
      toast.success(data?.message);
      GetWishListBridg();
    } else {
      toast.error(
        "something went wrong please refresh the page and try again",
        {
          duration: 4000,
          position: "top-right",
        }
      );
      GetWishListBridg();
    }
  }

  async function addProToCart(id) {
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success(data?.message, {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error(data?.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("productsQuery", getProducts);

  return (
    <>
      <Helmet>
        <title>
          Products
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
        <div className="row ">
          <form action="">
            <div className="text-center w-100 mx-auto d-flex align-items-center mb-5">
              <input
                type="search"
                className="form-control w-75 mx-auto"
                placeholder="Search... "
                value={filterText}
                onChange={(e) => setfilterText(e.target.value)}
              />
            </div>
          </form>

          {data?.data.data.map((product) => {
            if (
              product.title.toLowerCase().indexOf(filterText.toLowerCase()) ===
              -1
            ) {
              return;
            }


            return (
              <div
                key={product.id}
                className="col-md-3 col-lg-3 col-xl-3 product p-2 mx-auto mb-4 rounded-3"
              >
                <Link
                  className=" text-dark text-decoration-none"
                  to={`/Details/${product.id}`}
                >
                  <img className="w-100" src={product.imageCover} alt="" />
                  <span className="font-sm text-main text-success">
                    {product.category.name}
                  </span>
                  <h3 className="h6 pt-3">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>

                  <div className="d-flex justify-content-between mt-3">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fa-solid fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addProToCart(product.id)}
                  className="btn bg-main text-light w-75"
                >
                  + Add
                </button>
                <button
                  style={{
                    color: wishListIds?.includes(product.id) ? "red" : "black",
                  }}
                  onClick={() => addToWL(product.id, product)}
                  className={`heart-btn w-25 m-0`}
                >
                  <i className="fa-solid fa-heart m-0 ms-4"></i>
                </button>
                
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
