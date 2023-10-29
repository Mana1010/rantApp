import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import title from "../pages/title.png";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import profile from "./images/default.png";
function CustomizeProfile() {
  const [imgOfficial, setImgOfficial] = useState<string>("");
  const [info, setInfo] = useState<any>(null);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });
  const { register, handleSubmit, reset } = form;
  function submitProfile(data: { username: string }) {
    setInfo({
      ...info,
      username: data.username,
    });
    reset();
    navigate("/newsfeed");
  }
  async function changeProfile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const fileParsed = e.target.files[0];
    const imageRef = ref(storage, `images/${fileParsed?.name}`);
    try {
      if (fileParsed === null) throw new Error("fileParsed is null");
      const bytes = await uploadBytes(imageRef, fileParsed);
      const download = await getDownloadURL(bytes.ref);
      setImgOfficial(download);
      setInfo({
        ...info,
        img: download,
      });
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(info));
  }, [info]);
  const parsing: string = JSON.parse(localStorage.getItem("profile") as string);
  return (
    <div className="w-screen h-screen bg-gradient-to-tr to-red-900 from-fuchsia-600 overflow-hidden">
      <header className="w-full p-3">
        <Link to="/">
          <img src={title} alt="title" className="w-[200px]" />
        </Link>
      </header>
      <div className=" w-full h-[90%] flex justify-center items-center px-5 flex-col">
        <form
          onSubmit={handleSubmit(submitProfile)}
          className="md:w-1/2 w-full bg-white md:h-1/2 h-[410px] p-3.5"
        >
          <h1 className="md:text-xl text-lg font-bold font-roboto text-slate-900 uppercase">
            Set your profile first
          </h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-6">
            <div className="flex flex-col justify-center w-full items-center space-y-2 md:basis-[30%]">
              <div className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full border-zinc-500/40 border-2">
                <img
                  src={imgOfficial || profile}
                  alt="profilePic"
                  className="w-full h-full object-contain"
                />
              </div>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={changeProfile}
              />
              <label
                htmlFor="file"
                className="font-roboto text-white bg-blue-500 text-lg px-4 py-2 rounded-sm cursor-pointer md:flex md:w-full md:justify-center"
              >
                Set Avatar
              </label>
            </div>
            <div className="md:basis-[70%] md:flex w-full md:flex-col md:justify-between space-y-4">
              <div className="space-y-2 w-full">
                <label
                  htmlFor="username"
                  className="text-lg font-roboto text-slate-900 font-bold"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    validate: (formVal) => {
                      return formVal !== "" || "Please fill up the form";
                    },
                  })}
                  placeholder="Enter your username"
                  className="text-slate-700 placeholder:text-slate-500 font-roboto text-lg outline-none border-b-2 border-black w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 font-roboto px-3 py-2 text-white w-full"
              >
                SET PROFILE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomizeProfile;
