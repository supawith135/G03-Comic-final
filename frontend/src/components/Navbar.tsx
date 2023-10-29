// import { Navbar } from "react-bootstrap";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
// import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
// import NavLinks from "./NavLinks";

// import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar justify-evenly">
        <div className="">
          {/* TITLE */}
          <NavLink to="/" className="btn btn-primary text-3xl items-center">
            C
          </NavLink>
        </div>
        <div className="">
          <ul className="menu menu-horizontal text-1xl ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
            <li>
              <NavLink to="/Products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/Cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/Payment">Payment</NavLink>
            </li>
            <li>
              <NavLink to="/Orders">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/Myreview">Myreview</NavLink>
            </li>
          </ul>
        </div>
        <div>
          {/* CART LINK */}
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
            <div className="indicator">
              <BsCart3 className="h-7 w-7" />
              <span className="badge badge-sm badge-primary indicator-item">
                {/* {numItemsInCart} */} 0
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
