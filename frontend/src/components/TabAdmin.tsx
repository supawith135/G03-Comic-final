import React from "react";
import { NavLink } from "react-router-dom";
const TabAdmin: React.FC = () => {
  return (
    <>
      <div>
        <ul className="menu bg-base-100 w-56 rounded-box mt-20 shadow-lg ">
          <li className="menu-title text-black text-2xl">Menu</li>
          <li>
            <NavLink to="/AddProduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/DataComic">Comic</NavLink>
          </li>
          <li>
            <NavLink to="/Member">Member</NavLink>
          </li>
          <li>
            <NavLink to="/Approve">Approve</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
export default TabAdmin;
