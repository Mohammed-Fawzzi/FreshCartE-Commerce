import React, { useContext, useEffect } from "react";
import { cartContext } from "../CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function WishList() {
  let { GetWishList, setwishList, wishList, addToCart } =
    useContext(cartContext);

  async function GetWishListBridg() {
    let { data } = await GetWishList();
    // console.log(data);
    if (data?.status === "success") {
      setwishList(data?.data);
    }
  }
  useEffect(() => {
    GetWishListBridg();
  }, []);

  async function removeItem(id) {
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem("usertoken"),
        },
      }
    );
    // console.log(data);
    if (data?.status === "success") {
      toast.success(data.message, { position: "top-right" });
      GetWishListBridg();
    } else {
      toast.error(data.message, { position: "top-right" });
    }
  }

  async function addToCartAndRemove(id) {
    let { data } = await addToCart(id);
    if (data?.status === "success") {
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error(data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
    removeItem(id);
  }

  return (
    <>
    <Helmet>
        <title>
          Wish List
        </title>
    </Helmet>
      {wishList === null?
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
      :
      <div className="bg-light mt-5 p-5 pt-5 mt-5">
        <div className=" d-flex justify-content-between mb-3">
          <div>
            <h3>My Wish List</h3>
          </div>
        </div>

        {wishList?.map((product, idx) => {
          return (
            <div key={idx} className="row my-3 py-2 border-bottom pt-4">
              <div className="col-md-2">
                <img className="w-100" src={product.imageCover} alt="" />
              </div>

              <div className="col-md-10 d-flex justify-content-between px-1 flex-wrap">
                <div className="py-5">
                  <h3 className="h4 pt-3">
                    {" "}
                    {product?.title.split(" ").slice(0, 10).join(" ")}
                  </h3>
                  <h6 className="text-main text-success pt-1">{product.price} EGP</h6>
                  <button
                    onClick={function () {
                      removeItem(product.id);
                    }}
                    className="p-0 btn font-sm"
                  >
                    <i className="text-danger fas fa-trash-can mx-1"></i>Remove
                  </button>
                </div>
                <div className="pt-5">
                  <button
                    onClick={function () {
                      addToCartAndRemove(product.id);
                    }}
                    className="btn btn-outline-success mt-5"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      }
    </>
  );
}
