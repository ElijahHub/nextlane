import { useContext, useState } from "react";
import axios from "axios";

import { AuthForm } from "../components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Register() {
  const inputData = {
    username: "",
    name: "",
    email: "",
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
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Enter Full Name",
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
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
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/auth/register", inputs);
      const loginInput = {
        username: inputs.username,
        password: inputs.password,
      };
      await context?.login(loginInput);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <AuthForm
      attribute={attribute}
      type="Sign Up"
      error={error}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  );
}
