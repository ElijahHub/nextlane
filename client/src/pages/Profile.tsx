import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Posts, Update } from "../components";
import { AuthContext } from "../context/auth.context";
import { DarkModeContext } from "../context/darkMode.context";
import { makeRequest } from "../utils";
import { profileStyle } from "../styles";

export default function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);

  const authContext = useContext(AuthContext);
  const darkContext = useContext(DarkModeContext);
  const { a, profile, uInfo, item } = profileStyle(darkContext?.darkMode);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await makeRequest.get(`/users/find/${userId}`);
      return res.data;
    },
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: async () => {
      const res = await makeRequest.get(
        `/relationships?followedUserId=${userId}`
      );
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, any>({
    mutationFn: async (following) => {
      if (following)
        return await makeRequest.delete(`/relationships?userId=${userId}`);
      return makeRequest.post("relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData?.includes(authContext?.currentUser?.id));
  };

  return (
    <div className={profile}>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className=" relative w-full h-[300px] ">
            <img
              src={`/upload/${data?.cover_pic}`}
              alt=""
              className="w-full h-full object-cover "
            />
            <img
              src={`/upload/${data?.profile_pic}`}
              alt={data?.username}
              className="absolute left-0 right-0 top-[200px] w-[200px] h-[200px] rounded-[50%] object-cover m-auto  "
            />
          </div>

          <div className=" p-[10px] md:p-[20px] lg:py-[20px] lg:px-[70px] ">
            <div className={uInfo}>
              <div className="flex flex-1 flex-wrap gap-[10px] lg:flex-nowrap ">
                <a href="http://facebook.com" className={a}>
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com" className={a}>
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com" className={a}>
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com" className={a}>
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com" className={a}>
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className=" flex items-center justify-center flex-col flex-1 gap-[10px] ">
                <span className="text-[30px] uppercase font-medium ">
                  {data?.name}
                </span>
                <div className="w-full flex items-center justify-between">
                  <div className={item}>
                    <PlaceIcon />
                    <span className="text-[12px]">{data?.city}</span>
                  </div>
                  <div className={item}>
                    <LanguageIcon />
                    <span className="text-[12px]">{data?.website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : authContext && userId === authContext?.currentUser?.id ? (
                  <button
                    onClick={() => setOpenUpdate(true)}
                    className="border-none bg-[#5271ff] text-white py-[10px] px-[20px] rounded-[5px] cursor-pointer "
                  >
                    update
                  </button>
                ) : (
                  <button
                    className="border-none bg-[#5271ff] text-white py-[10px] px-[20px] rounded-[5px] cursor-pointer "
                    onClick={handleFollow}
                  >
                    {relationshipData?.includes(authContext?.currentUser?.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="flex items-center justify-end flex-1 gap-[10px] ">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}
