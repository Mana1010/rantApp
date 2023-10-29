import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import title from "../pages/title.png";
function Layout() {
  return (
    <div className="w-screen h-screen bg-slate-600 overflow-hidden">
      <header className="w-full p-2">
        <Link to="/">
          <img
            src={title}
            alt="title"
            className="md:w-[230px] sm:w-[200px] w-[150px]"
          />
        </Link>
      </header>
      <div className="flex justify-center items-center w-screen sm:h-[80%] h-[530px] flex-col px-4 overflow-hidden">
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
      </div>
    </div>
  );
}

export default Layout;
