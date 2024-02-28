import React, { useContext, useEffect } from "react";
import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import { UserContext } from "../TokenContext/TokenContext";


export default function Layout() {
  let { setUserToken} = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("usertoken") !== null) {
      setUserToken(localStorage.getItem("usertoken"));
    }
  }, []);

  return (
    <>
      <Nav />
      <div className="container min-vh-100">
        <Outlet></Outlet>
      </div>
    </>
  );
}
