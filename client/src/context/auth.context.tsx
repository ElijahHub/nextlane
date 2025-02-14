import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";

import { CurrentUser as User, AuthContextType, Login } from "../types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (inputs: Login) => {
    try {
      const res = await axios.post<User>(
        "http://localhost:8000/api/auth/login",
        inputs,
        { withCredentials: true }
      );

      setCurrentUser(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || "An unknown error occurred"; // Return backend error message
      } else {
        throw "An unexpected error occurred";
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
