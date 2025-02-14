import { Link } from "react-router-dom";

import { AuthFormProps } from "../types";

export default function AuthForm({
  attribute,
  icon,
  type,
  error,
  handleChange,
  handleClick,
}: AuthFormProps) {
  return (
    <div className="flex justify-center  ">
      <div className=" w-full h-[100vh] md:w-[25rem] my-auto flex justify-center flex-col gap-6 ">
        <div className="w-full flex items-center justify-center">
          {type === "Login" ? (
            <h3 className="h3">Welcome</h3>
          ) : (
            <h3 className="h3">Create Account</h3>
          )}
        </div>

        <div className=" w-full flex flex-col gap-5">
          {attribute.map((item) => (
            <div key={item.id} className="relative">
              <input
                type={item.type || "text"}
                className="w-full text-sm bg-transparent border-2 border-n-3 rounded-sm px-6 py-3 placeholder:opacity-[0.9] focus:outline-none  "
                placeholder={item.placeholder || ""}
                onChange={handleChange}
                name={item.name}
              />
              <div className="">{icon}</div>
            </div>
          ))}
        </div>

        {error && <div className="">{error}</div>}

        <button
          className="bg-black w-full text-white py-3 text-center rounded-sm focus:outline-none cursor-pointer "
          onClick={handleClick}
        >
          {type}
        </button>

        <div className="w-full flex items-center justify-center">
          {type === "Login" ? (
            <p className="body-2">
              Don't have an account?
              <Link className="text-n-3" to="/sign-up">
                Create Account
              </Link>
            </p>
          ) : (
            <p className="body-2">
              Already have an account?{" "}
              <Link className="text-n-3" to="/login">
                Log in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
