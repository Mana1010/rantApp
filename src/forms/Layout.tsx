import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Style } from "../pages/Home";
import { motion } from "framer-motion";
import title from "../pages/title.png";
function Layout() {
  const location = useLocation();
  return (
    <Style>
      <header className="w-full p-2">
        <img
          src={title}
          alt="title"
          className="md:w-[230px] sm:w-[200px] w-[150px]"
        />
      </header>
      <motion.div className="flex justify-center items-center w-screen h-[80%] flex-col px-4">
        <div className="w-full md:w-1/2 h-[80%] md:h-[90%] bg-[#2E3138] rounded-sm py-3 px-4">
          <header className="flex space-y-6 w-full flex-col">
            <h1 className="font-poppins text-white text-xl">
              Registration Form
            </h1>
            <ul className="w-full flex justify-center items-center space-x-2 bg-blue-600">
              <NavLink
                to="."
                className={`text-white font-roboto font-bold text-md md:text-xl px-3 py-2 rounded sm w-1/2 text-center ${
                  location.pathname === "/form" && "bg-blue-300/70"
                }`}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="./login"
                className={`text-white font-roboto font-bold text-md md:text-xl px-3 py-2 rounded-sm w-1/2 text-center ${
                  location.pathname === "/form/login" && "bg-blue-300/70"
                }`}
              >
                Login
              </NavLink>
            </ul>
          </header>
          <Outlet />
        </div>
      </motion.div>
    </Style>
  );
}

export default Layout;
