import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../config/firebase";
import { DevTool } from "@hookform/devtools";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import facebook from "./images/fb.png";
import google from "./images/google.png";
import { useNewsFeedStore } from "../store/newsfeedStore";
type Info = {
  email: string;
  password: string;
};
function Login() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { stateChanged } = useNewsFeedStore();
  const navigate = useNavigate();
  const form = useForm<Info>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errors, setError] = useState<string>("");
  const { handleSubmit, register, control, reset, formState } = form;
  async function formSub(data: Info) {
    try {
      setLoading(true);
      const dataInfo = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const infos = {
        uuid: dataInfo.user.uid,
        email: dataInfo.user.email,
      };
      localStorage.setItem("information", JSON.stringify(infos));
      stateChanged();
      setError("");
      navigate(
        JSON.parse(localStorage.getItem("profile") as string)
          ? "/newsfeed"
          : "/customizeProfile"
      );
      reset();
    } catch (err) {
      setError("Incorrect email or password");
      console.error(err);
    }
    setLoading(false);
  }
  return (
    <div className="py-3.5">
      <form onSubmit={handleSubmit(formSub)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white font-poppins text-sm">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="*****@gmail.com"
            {...register("email", {
              validate: (formVal) => {
                return formVal !== "" || "Please fill up the form";
              },
            })}
            className={`p-1.5 outline-none rounded-sm border-b-2 bg-transparent text-white`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white font-poppins text-sm">
            Password
          </label>
          <div
            className={`flex justify-between items-center outline-none rounded-sm pr-2.5  border-b-2 bg-transparent text-white`}
          >
            <input
              type={showPass ? "text" : "password"}
              id="password"
              placeholder="*****"
              {...register("password", {
                validate: (formVal) => {
                  return formVal !== "" || "Please fill up the form";
                },
              })}
              className="w-[80%] p-1.5 bg-transparent outline-none"
            />
            <button
              onClick={() => setShowPass((prev) => !prev)}
              type="button"
              className="text-xl"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {errors && <p className="text-red-400 font-roboto">{errors}</p>}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 font-roboto text-lg font-bold text-white uppercase"
        >
          {loading ? "Authenticating" : "Log in"}
        </button>
        <div className="flex justify-center flex-col w-full items-center">
          <h1 className=" text-white font-poppins">
            --------------OR---------------
          </h1>
          <div className="flex space-x-4 p-2">
            <button
              onClick={async () => {
                try {
                  signInWithPopup(auth, facebookAuthProvider);
                  stateChanged();
                  navigate("/newsfeed");
                } catch (err) {
                  console.error(err);
                }
              }}
              type="button"
              className="w-10 p-2 bg-white"
            >
              <img src={facebook} alt="facebook-icon" className="w-full" />
            </button>
            <button
              onClick={async () => {
                try {
                  const data = await signInWithPopup(auth, googleAuthProvider);
                  stateChanged();
                  navigate("/newsfeed");
                } catch (err) {
                  console.error(err);
                }
              }}
              type="button"
              className="w-10 p-2 bg-white"
            >
              <img src={google} alt="google-icon" className="w-full" />
            </button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Login;
