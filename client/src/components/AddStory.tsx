import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { makeRequest } from "../utils";
import { DarkModeContext } from "../context/darkMode.context";

interface StoryType {
  desc: string;
  storyImg: File | null;
}

export default function AddStory({
  setOpenUpdate,
}: {
  setOpenUpdate(val: boolean): void;
}) {
  const storyData: StoryType = {
    desc: "",
    storyImg: null,
  };

  const [story, setStory] = useState(storyData);
  const { storyImg, desc } = story;
  const darkContext = useContext(DarkModeContext);

  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, any>({
    mutationFn: async (story) => {
      return makeRequest.post("/stories", story);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
  });

  const upload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let image = storyImg && (await upload(storyImg));
    mutation.mutate({ img: image, desc: desc });
    setOpenUpdate(false);
  };

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[999] ">
      <div className={` hide-scrollbar`}>
        <h1 className="text-gray-100 text-[20px] md:text-[16px] ">
          Add Your Story
        </h1>

        <form className="flex flex-col gap-[20px] ">
          <div className="flex items-start flex-wrap gap-[50px] ">
            <label
              htmlFor="storyImg"
              className="flex flex-col gap-[10px] text-gray-500 text-[14px] "
            >
              <span>Story Image</span>
              <div className=" relative">
                <img
                  //   src={`/upload/${user.cover_pic}`}
                  alt=""
                  className="w-full h-[100px] object-cover"
                />
                <CloudUploadIcon className="absolute top-0 bottom-0 left-0 right-0 m-auto text-[30px] text-gray-100 cursor-pointer " />
              </div>
            </label>
            <input
              type="file"
              id="storyImg"
              className="hidden"
              onChange={(e) =>
                setStory({ ...story, storyImg: e.target.files?.[0] ?? null })
              }
            />
          </div>
          <textarea name="" id=""></textarea>

          <button
            onClick={handlePost}
            className="border-none p-[10px] cursor-pointer text-white bg-[#5271ff] "
          >
            Post Story
          </button>
        </form>
        <button
          className="absolute top-[10px] right-[20px] bg-[#f0544f] p-[5px] cursor-pointer text-white "
          onClick={() => setOpenUpdate(false)}
        >
          close
        </button>
      </div>
    </div>
  );
}
