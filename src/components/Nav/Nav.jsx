import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/imgs/freshcart-logo.svg";
import { UserContext } from "../TokenContext/TokenContext";

export default function Nav() {
  let navigate = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem("usertoken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div className="container ">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Fresh Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body ms-1">
              {userToken !== null ? (
                <>
                  <ul
                    className="navbar-nav mb-lg-0 ms-auto me-5 mt-2"
                    id="navbarContent"
                  >
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="/home">
                        Home
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        Cart
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/WishList">
                        Wish List
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/Products">
                        Products
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/Categories">
                        Categories
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/Brands">
                        Brands
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {userToken === null ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/Register">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link "
                        aria-current="page"
                        to="/Login"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item position-relative">
                      <Link className="nav-link" to="cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                      </Link>
                      <span className="cart-spa d-inline-block cart d-flex justify-content-center align-items-center position-absolute rounded-3">0</span>
                    </li>

                    <li className="nav-item me-5 mt-2">
                      <span
                        onClick={logOut}
                        className="nav-link cursor-pointer me-1 log-spa"
                      >
                        Log Out
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
