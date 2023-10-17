import React from "react";
import { useNewsFeedStore } from "../store/newsfeedStore";
import title from "./title.png";
import { Link } from "react-router-dom";
import defaultPic from "../forms/images/default.png";
function Newsfeed() {
  const getImg: any = JSON.parse(localStorage.getItem("profile") as string);
  console.log(getImg?.img);
  return (
    <div className="bg-slate-900 w-screen h-screen overflow-hidden">
      <header className="w-full py-3 px-4 flex justify-between">
        <Link to="/">
          <img src={title} alt="title" width={200} />
        </Link>
        <div className="w-[100px] h-[100px] overflow-hidden rounded-full">
          <img
            src={getImg?.img || defaultPic}
            alt="profilePic"
            width={100}
            height={100}
            className="=object-contain bg-center"
          />
        </div>
      </header>
      <div className="flex justify-center items-center flex-col h-full w-full"></div>
    </div>
  );
}

export default Newsfeed;
