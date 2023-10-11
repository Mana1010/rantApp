import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "./config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import useZustand from "./store/todoStore";

export type Info = {
  username: string;
  description: string;
};
function TodoList() {
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const { addDocs, storageData, onSnap, offSnap, imageList } = useZustand();
  const form = useForm<Info>({
    defaultValues: {
      username: "",
      description: "",
    },
  });
  const { register, handleSubmit, reset } = form;
  const submitThoughts = (data: Info) => {
    addDocs(data, imgUrl);
    reset();
  };
  useEffect(() => {
    onSnap();
    return () => {
      console.log("Removed");
      offSnap();
    };
  }, []);
  function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const files = e.target.files[0];
    setImgUrl(files);
  }
  return (
    <div className="w-full h-full flex items-center justify-center flex-col space-y-2">
      <h1 className="text-white font-poppins text-lg font-bold uppercase text-violet-300">
        Share your Thoughts
      </h1>
      <form
        className="w-[20%] rounded-sm h-1/2 bg-white px-3 py-5 overflow-auto space-y-3"
        onSubmit={handleSubmit(submitThoughts)}
      >
        <input
          type="file"
          className="w-full p-2 bg-zinc-400/30"
          onChange={handleImg}
        />
        <input
          placeholder="Username"
          type="text"
          id="username"
          {...register("username")}
          className="w-full p-2 bg-zinc-400/30"
        />
        <textarea
          placeholder="Enter your thoughts"
          typeof="text"
          id="description"
          {...register("description")}
          className="w-full p-2 bg-zinc-400/30"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-poppins text-lg uppercase font-bold"
        >
          Submit
        </button>
        <button
          type="button"
          className="w-full p-2 bg-blue-600 text-white font-poppins text-lg uppercase font-bold"
        >
          Delete the snapshot
        </button>
      </form>
      <div>
        {imageList.map((maplist: any, index: number) => (
          <img key={index} src={maplist} width={50} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
