import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { cartContext } from "../CartContext";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    cartDetails,
    setcartDetails,
    GetLoggedusercart,
    updateCartQuantity,
    removeCartItem,
    clearAllCart,
  } = useContext(cartContext);

  async function getCart() {
    setcartDetails(null);
    let response = await GetLoggedusercart();
    if (response.data) {
      setcartDetails(response.data);
    } else {
      setcartDetails("empty");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  async function clearCart() {
    await clearAllCart();
    getCart();
  }

  async function updateCount(id, count) {
    let { data } = await updateCartQuantity(id, count);
    setcartDetails(data);
  }

  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setcartDetails(data);
  }

  return (
    <div className="">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails === null ? (
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
      ) : cartDetails === "empty" ? (
        <div className="mt-5 py-5 bg-light cart">
          <h2 className="fw-bolder ms-5">Cart Shop</h2>
          <p className="py-4 fs-3 ms-5">Your Cart Is Empty</p>
        </div>
      ) : (
        <>
          <div className="bg-light mt-5 p-4">
            <div className=" d-flex justify-content-between mb-3 border-bottom  border-dark-subtle">
              <div>
                <h3 className="pb-4">Cart Shop</h3>
                <h4 className="text-main h5 pt-2">
                  Total Price: <span>{cartDetails.data.totalCartPrice}</span>
                </h4>
              </div>

              <div>
                <Link
                  to={"/BuyerData"}
                  className="btn bg-primary text-white fs-4 check"
                >
                  Check Out
                </Link>
                <h4 className="text-main h5 pt-4">
                  Total Number Of Items :
                  <span> {cartDetails.numOfCartItems} </span>
                </h4>
              </div>
            </div>
            {cartDetails.data.products.map((product, idx) => {
              return (
                <div key={idx} className="row my-3 py-2 border-bottom ">
                  <div className="col-md-2">
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt=""
                    />
                  </div>

                  <div className="col-md-10 d-flex justify-content-between px-1 flex-wrap">
                    <div>
                      <h3 className="h6 pt-5 mt-4">
                        {" "}
                        {product.product.title
                          .split(" ")
                          .slice(0, 14)
                          .join(" ")}
                      </h3>
                      <h6 className="text-main ">{product.price} EGP</h6>
                      <button
                        onClick={() => removeItem(product.product.id)}
                        className="p-0 btn font-sm"
                      >
                        <i className="text-danger fas fa-trash-can mx-1"></i>
                        Remove
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count + 1)
                        }
                        className="btn brdr-main"
                      >
                        +
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count - 1)
                        }
                        className="btn brdr-main"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mb-5">
            <button onClick={clearCart} className="btn brdr-main">
              {" "}
              Clear Your Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
