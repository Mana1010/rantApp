import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export type Info = {
  email: string;
  password: string;
  confirmpassword: string;
};
function SignUp() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConpass, setShowConPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inUse, setInUse] = useState("");
  const form = useForm<Info>({
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const { register, control, handleSubmit, formState, watch, reset } = form;
  const { errors } = formState;
  async function formSub(data: Info) {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("login");
      reset();
    } catch (err) {
      setInUse("Email already in use");
    }
    setLoading(false);
  }
  return (
    <div className="py-5">
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
              required: {
                value: true,
                message: "Please fill up the email",
              },
            })}
            className={`p-1.5 outline-none rounded-sm ${
              errors.email?.message ? "border-red-500" : "border-white"
            } border-b-2 bg-transparent text-white`}
          />
          {errors.email?.message && (
            <p className="text-red-500 font-roboto text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white font-poppins text-sm">
            Password
          </label>
          <div
            className={`flex justify-between items-center outline-none rounded-sm pr-2.5 ${
              errors.password?.message ? "border-red-500" : "border-white"
            } border-b-2 bg-transparent text-white`}
          >
            <input
              type={showPass ? "text" : "password"}
              id="password"
              placeholder="*****"
              {...register("password", {
                pattern: {
                  value: /[!@#%$^&*()_+ -=.~`]/g,
                  message: "Please include one symbols",
                },
                validate: {
                  fillUp: (formVal) => {
                    return formVal !== "" || "Please fill up the form";
                  },
                  lenghtAcc: (formVal) => {
                    return formVal.length >= 8 || "No less than 8 characters";
                  },
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
          {errors.password?.message && (
            <p className="text-red-500 font-roboto text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-white font-poppins text-sm">
            Confirm Password
          </label>
          <div
            className={`flex justify-between items-center outline-none rounded-sm pr-2.5 ${
              errors.confirmpassword?.message
                ? "border-red-500"
                : "border-white"
            } border-b-2 bg-transparent text-white`}
          >
            <input
              type={showConpass ? "text" : "password"}
              id="confirmpassword"
              placeholder="*****"
              {...register("confirmpassword", {
                validate: {
                  passwordMatch: (passwords) => {
                    return (
                      passwords === watch("password") || "Password is not match"
                    );
                  },
                },
              })}
              className="w-[80%] p-1.5 bg-transparent outline-none"
            />
            <button
              onClick={() => setShowConPass((prev) => !prev)}
              type="button"
              className="text-xl"
            >
              {" "}
              {showConpass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmpassword?.message && (
            <p className="text-red-500 font-roboto text-sm">
              {errors.confirmpassword.message}
            </p>
          )}
        </div>
        <div>
          {inUse && <p className="text-red-400 font-roboto">{inUse}</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 font-roboto text-lg font-bold text-white uppercase"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
