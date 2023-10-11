import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
export type Info = {
  email: string;
  password: string;
  confirmpassword: string;
};
function SignUp() {
  const form = useForm<Info>({
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    mode: "all",
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  async function submitForm(data: Info) {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
  }
  return (
    <div className="py-5">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-white font-poppins text-sm">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            placeholder="*****@gmail.com"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter emal",
              },
            })}
            className={`p-1.5 outline-none rounded-sm ${
              errors.email?.message ? "border-red-500" : "border-white"
            } border-b-2 bg-transparent text-white`}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default SignUp;
