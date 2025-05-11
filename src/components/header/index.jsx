import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
   return (
      <div className="mb-10">
         <div className="container py-4 flex justify-between items-center">
            <h1 className="text-4xl">React Lesson</h1>
            <ul className="flex gap-[20px]">
               <li className="text-2xl">
                  <NavLink to={"/"}> Home </NavLink>
               </li>
               <li className="text-2xl">
                  <NavLink to={"/products"}> Products </NavLink>
               </li>
               <li className="text-2xl">
                  <NavLink to={"/categories"}> Categories </NavLink>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Header;
