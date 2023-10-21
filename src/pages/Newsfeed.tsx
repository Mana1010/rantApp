import React, { useState, useEffect } from "react";
import { useNewsFeedStore } from "../store/newsfeedStore";
import title from "./title.png";
import { Link } from "react-router-dom";
import defaultPic from "../forms/images/default.png";
import { FaArrowDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import MakeAPost from "./MakeAPost";
type UserInfo = {
  img: string;
  post: string;
  username: string;
  id: string;
};
function Newsfeed() {
  const [showEdit, setShowEdit] = useState(false);
  const { userPostList, onSnapFeed, offSnapFeed } = useNewsFeedStore();
  const getImg: any = JSON.parse(localStorage.getItem("profile") as string);

  console.log(userPostList);
  useEffect(() => {
    onSnapFeed();
    return () => {
      offSnapFeed();
    };
  }, []);
  const sortedArr = userPostList.sort(
    (a: any, b: any) => a.createdAt - b.createdAt
  );
  return (
    <div className="bg-slate-900 w-screen h-screen overflow-hidden px-3">
      <header className="w-full py-3 px-4 flex justify-between">
        <Link to="/">
          <img src={title} alt="title" width={200} />
        </Link>
        <div className="flex space-x-4 items-center px-2">
          <button
            onClick={() => setShowEdit((prev) => !prev)}
            className="text-white hidden md:block font-roboto px-4 py-2 bg-yellow-600 rounded-sm active:bg-yellow-400 uppercase"
          >
            Make a rant
          </button>
          <div className="ring-1 ring-yellow-400 w-[40px] h-[40px] overflow-hidden rounded-full">
            <img
              src={getImg?.img || defaultPic}
              alt="profilePic"
              className="=object-contain bg-center w-full h-full"
            />
          </div>
          <button className="flex md:hidden text-white">
            <FaArrowDown />
          </button>
          <div className="md:flex items-center space-x-2 cursor-pointer hidden">
            <h4 className="text-white text-sm font-roboto">
              {getImg?.username}
            </h4>
            <button className="text-white font-extralight">
              {" "}
              <FaArrowDown />
            </button>
          </div>
        </div>
      </header>
      <button
        onClick={() => setShowEdit((prev) => !prev)}
        className="text-white font-roboto w-full md:hidden py-2 bg-yellow-600 rounded-sm active:bg-yellow-400 text-xl uppercase"
      >
        Make a rant
      </button>
      <div className="flex justify-center items-center flex-col h-full w-full py-2 px-3">
        <div className="md:w-[70%] w-full h-full md:h-[70%] overflow-y-auto border border-slate-600 divide-y-2 divide-[#0F172A]">
          {sortedArr.map((userRant: UserInfo) => (
            <div
              key={userRant.id}
              className="w-full bg-white h-[150px] overflow-auto px-2.5 py-1"
            >
              <div className="space-x-4 flex items-center">
                <div className="w-[50px] h-[50px] rounded-full border border-yellow-500">
                  <img
                    className="object-contain"
                    src={userRant.img || ""}
                    alt="userImg"
                  />
                </div>
                <h4 className="font-bold font-roboto">{userRant.username}</h4>
              </div>
              <div className="py-5 w-full overflow-hidden">
                <p className="font-roboto">{userRant.post}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showEdit && <MakeAPost setShowEdit={setShowEdit} />}
    </div>
  );
}

export default Newsfeed;
