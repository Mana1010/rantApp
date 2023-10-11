import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNewsFeedStore } from "../store/newsfeedStore";
import scatter from "./scatter.png";
import title from "./title.png";
import { motion } from "framer-motion";
export const Style = styled.div`
  background: url(${scatter});
  background-position: center;
  width: 100%;
  height: 100vh;
`;
function Home() {
  const { isLoggedIn } = useNewsFeedStore();
  return (
    <Style>
      <motion.div
        key="modal"
        initial={{ x: "-100vw", opacity: 0.3 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        exit={{ x: "100vw", opacity: 0, background: "red" }}
        className="w-full h-full"
      >
        <div className="flex items-center justify-center w-full h-full flex-col space-y-4">
          <img src={title} alt="title" className="" />
          <p className="sm:text-lg text-center text-white font-roboto font-bold">
            You have freedom to rant all you want in this app
          </p>
          <Link
            to={isLoggedIn ? "/newsfeed" : "form"}
            className="px-5 py-3 bg-blue-500 rounded-md font-roboto text-lg text-white"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </Style>
  );
}

export default Home;
