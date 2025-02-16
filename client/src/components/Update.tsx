import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { makeRequest, upload } from "../utils";
import { UpdateProps, User } from "../types";
import { updateStyle } from "../styles";
import { DarkModeContext } from "../context/darkMode.context";
import { AuthContext } from "../context/auth.context";

export default function Update({ setOpenUpdate, user }: UpdateProps) {
  const textData: User = {
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  };

  const [cover, setCover] = useState<File | null>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [texts, setTexts] = useState(textData);

  const darkContext = useContext(DarkModeContext);
  const context = useContext(AuthContext);
  const { wrapper, input } = updateStyle(darkContext?.darkMode);

  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, any>({
    mutationFn: async (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.cover_pic;
    profileUrl = profile ? await upload(profile) : user.profile_pic;
    mutation.mutate({ ...texts, profile_pic: profileUrl, cover_pic: coverUrl });
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...context?.currentUser,
        profile_pic: profileUrl,
        cover_pic: coverUrl,
      })
    );
    setOpenUpdate(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexts({ ...texts, [e.target.name]: [e.target.value] });
  };

  const coverImg = cover
    ? URL.createObjectURL(cover)
    : `/upload/${user.cover_pic}`;

  const profileImg = profile
    ? URL.createObjectURL(profile)
    : `/upload/${user.profile_pic}`;
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[999]  ">
      <div className={` hide-scrollbar ${wrapper}`}>
        <h1 className="text-gray-100 text-[20px] md:text-[16px] ">
          Update Your Profile
        </h1>

        <form className="flex flex-col gap-[20px] ">
          <div className="flex items-start flex-wrap gap-[50px] ">
            <label
              htmlFor="cover"
              className="flex flex-col gap-[10px] text-gray-500 text-[14px] "
            >
              <span>Cover Picture</span>
              <div className=" relative">
                <img
                  src={coverImg}
                  alt=""
                  className="w-full h-[100px] object-cover"
                />
                <CloudUploadIcon className="absolute top-0 bottom-0 left-0 right-0 m-auto text-[30px] text-gray-100 cursor-pointer " />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              className="hidden"
              onChange={(e) => setCover(e.target.files?.[0] ?? null)}
            />

            <label
              htmlFor="profile"
              className="flex flex-col gap-[10px] text-gray-500 text-[14px] "
            >
              <span>Profile Picture</span>
              <div className="relative">
                <img
                  src={profileImg}
                  alt=""
                  className="w-full h-[100px] object-cover"
                />
                <CloudUploadIcon className="absolute top-0 bottom-0 left-0 right-0 m-auto text-[30px] text-gray-100 cursor-pointer " />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              className="hidden"
              onChange={(e) => setProfile(e.target.files?.[0] ?? null)}
            />
          </div>

          <label>Email</label>
          <input
            type="text"
            name="email"
            className={input}
            value={texts.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            className={input}
            value={texts.password}
            onChange={handleChange}
          />

          <label>Name</label>
          <input
            type="text"
            name="name"
            className={input}
            value={texts.name}
            onChange={handleChange}
          />

          <label>Country / City</label>
          <input
            type="text"
            name="city"
            className={input}
            value={texts.city}
            onChange={handleChange}
          />

          <label>Website</label>
          <input
            type="text"
            name="website"
            className={input}
            value={texts.website}
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="border-none p-[10px] cursor-pointer text-white bg-[#5271ff] "
          >
            Update
          </button>
        </form>
        <button className="absolute top-[10px] right-[20px] bg-[#f0544f] p-[5px] cursor-pointer text-white ">
          close
        </button>
      </div>
    </div>
  );
}
