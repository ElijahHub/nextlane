import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { makeRequest } from "../utils";
import { DarkModeContext } from "../context/darkMode.context";
import { AuthContext } from "../context/auth.context";

interface StoryType {
  desc: string;
  img: File | null;
}

export default function AddStory() {
  const storyData: StoryType = {
    desc: "",
    img: null,
  };

  const [story, setStory] = useState(storyData);

  const darkContext = useContext(DarkModeContext);

  return (
    <div className="">
      <div className=""></div>
    </div>
  );
}
