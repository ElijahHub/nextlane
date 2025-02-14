import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DarkModeContext } from "../context/darkMode.context";
import { AuthContext } from "../context/auth.context";
import { makeRequest } from "../utils";
import { shareStyle } from "../styles";

import { Image, Friend, Map } from "../assets";

export default function Share() {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  //* Use Context Call
  const authContext = useContext(AuthContext);
  const darkContext = useContext(DarkModeContext);

  //* Getting Custom Styles
  const { share, input, hr } = shareStyle(darkContext?.darkMode);

  //* Query to post new posts
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, any>({
    mutationFn: async (newPost) => {
      await makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  //* Uploading Img File to db and creating a upload folder in the public folder to store imgs uploaded
  const upload = async () => {
    try {
      const formData = new FormData();
      file !== null && formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //* Handling Click Request to Upload img
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let imgUrl = "";
    if (file) imgUrl = await upload();

    mutation.mutate({ desc, img: imgUrl });
    setFile(null);
    setDesc("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  return (
    <div className={share}>
      <div className="p-[20px] ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center flex-3">
            <img
              src={`/upload/${authContext?.currentUser?.profile_pic}` || ""}
              alt={authContext?.currentUser?.username}
              className=" w-[40px] h-[40px] rounded-[50%] object-cover "
            />
            <input
              type="text"
              placeholder={`What on your mind ${authContext?.currentUser?.username}`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={input}
            />
          </div>

          <div className="flex-1 flex justify-end  ">
            {file && (
              <img
                className="w-full h-[100px] object-cover rounded-[0]"
                alt=""
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>

        <hr className={hr} />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap=[20px] ">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleChange}
            />

            <label htmlFor="file">
              <div className="flex items-center gap-[10px] cursor-pointer ">
                <img src={Image} alt="" className=" h-[20px] " />
                <span className="text-[12px] text-gray-400  ">Add Image</span>
              </div>
            </label>

            <div className="flex items-center gap-[10px] cursor-pointer ">
              <img src={Map} alt="" className="h-[20px]" />
              <span className="text-[12px] text-gray-400 ">Add Place</span>
            </div>

            <div className="flex items-center gap-[10px] cursor-pointer ">
              <img src={Friend} alt="" className="h-[20px]" />
              <span className="text-[12px] text-gray-400 ">Tag Friends</span>
            </div>
          </div>

          <div>
            <button
              className="border-none p-[5px] text-white cursor-pointer bg-[#5271ff] rounded-[3px] "
              onClick={handleClick}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
