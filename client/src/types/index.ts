import { ReactNode } from "react";

export interface AuthFormProps {
  attribute: {
    id: string;
    name: string;
    type: string;
    placeholder: string;
  }[];
  type: "Sign Up" | "Login";
  icon?: ReactNode;
  error?: string | null;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  handleClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface PostProps {
  id: number;
  name: string;
  desc: string;
  img: string;
  profile_pic: string;
  createdAt: string;
  userId: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
  city: string;
  website: string;
}

interface Other {
  cover_pic: string;
  profile_pic: string;
}

export interface UpdateProps {
  user: User & Other;
  setOpenUpdate(val: boolean): void;
}

export interface Comment {
  name: string;
  desc: string;
  profile_pic: string;
  createdAt: string;
}

export type Login = { username: string; password: string };

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  name: string;
  profile_pic: string | null;
  cover_pic: string | null;
  city: string | null;
  website: string | null;
}

export interface AuthContextType {
  currentUser: CurrentUser | null;
  login(inputs: Login): void;
}

export interface DarkModeContextType {
  darkMode: boolean;
  toggle(): void;
}

export interface StoryType {
  desc: string;
  storyImg: File | null;
}
