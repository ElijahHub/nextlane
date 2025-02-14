import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthForm } from "../components";
import { AuthContext } from "../context/auth.context";

export default function Login() {
  const inputData = {
    username: "",
    password: "",
  };

  const attribute = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Enter Username",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
    },
  ];

  const [inputs, setInputs] = useState(inputData);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value.trim() });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await context?.login(inputs);
      navigate("/");
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <AuthForm
      attribute={attribute}
      type="Login"
      handleChange={handleChange}
      handleClick={handleClick}
      error={error}
    />
  );
}
