import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useNewsFeedStore } from "../store/newsfeedStore";
import scatter from "./scatter.png";
import title from "./title.png";
import { motion } from "framer-motion";
function Home() {
  const { isLoggedIn } = useNewsFeedStore();
  return (
    <motion.div
      exit={{ x: "-100vw", opacity: 0, transition: { duration: 0.5 } }}
      className="w-screen h-screen bg-[#211E1E] overflow-hidden"
    >
      <div className="flex items-center justify-center flex-col w-full h-full space-y-4">
        <motion.img
          initial={{ y: "-100vw", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          src={title}
          alt="title"
          className=""
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="sm:text-lg text-center text-white font-roboto font-bold"
        >
          You have freedom to rant all you want in this app
        </motion.p>
        <Link
          to={isLoggedIn ? "/newsfeed" : "form"}
          className="px-5 py-3 bg-blue-500 rounded-md font-roboto text-lg text-white"
        >
          Get Started
        </Link>
      </div>
    </motion.div>
  );
}

export default Home;
