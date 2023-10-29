import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import title from "./title.png";
import { useNewsFeedStore } from "../store/newsfeedStore";
type States = {
  setShowEdit: Dispatch<SetStateAction<boolean>>;
};
function MakeAPost({ setShowEdit }: States) {
  const { addUserFeed, onSnapFeed, offSnapFeed } = useNewsFeedStore();
  const form = useForm({
    defaultValues: {
      post: "",
    },
  });
  const { register, handleSubmit, reset } = form;
  function submitRant(data: { post: string }) {
    const dates: number = Date.now();
    addUserFeed(data, dates);
    setShowEdit((prev) => !prev);
    reset();
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white/40 backdrop-blur-sm absolute top-0 bottom-0 left-0 right-0 px-8">
      <form
        onSubmit={handleSubmit(submitRant)}
        className="w-full md:w-1/2 h-1/2 md:h-[500px] bg-white px-2.5 py-2 flex justify-center items-center flex-col"
      >
        <header className="w-full flex items-center justify-between ">
          <img width={150} src={title} alt="title" />
          <div className="flex items-center space-x-4">
            <div className="overflow-hidden w-[60px] h-[60px] rounded-full border">
              <img
                className="object-contain"
                src={JSON.parse(localStorage.getItem("profile") || "").img}
                alt="profilePic"
              />
            </div>
            <h3 className="font-roboto font-bold">
              {JSON.parse(localStorage.getItem("profile") || "").username}
            </h3>
          </div>
        </header>
        <div className="flex space-y-4 w-full h-full flex-col justify-center">
          <label className="font-bold uppercase font-roboto" id="post">
            Make your Rant
          </label>
          <textarea
            className="w-full h-1/2 px-4 py-2 outline-none bg-black/10 rounded-sm font-roboto"
            id="post"
            {...register("post")}
            placeholder="Make your rant"
          />
          <button
            className="w-full bg-blue-600 py-3 text-white font-bold"
            type="submit"
          >
            POST
          </button>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
}

export default MakeAPost;
