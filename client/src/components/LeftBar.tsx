import { useContext } from "react";

import { AuthContext } from "../context/auth.context";
import { leftBarStyle } from "../styles";
import {
  Friends,
  Groups,
  Market,
  Watch,
  Memories,
  Events,
  Gaming,
  Gallery,
  Videos,
  Messages,
  Tutorials,
  Courses,
  Fund,
} from "../assets";
import { DarkModeContext } from "../context/darkMode.context";

export default function LeftBar() {
  const authContext = useContext(AuthContext);
  const darkContext = useContext(DarkModeContext);

  const { hr, leftBar } = leftBarStyle(darkContext?.darkMode);

  return (
    <div className={`hide-scrollbar ${leftBar} `}>
      <div className="p-[20px] ">
        <div className="flex items-center px-2 pb-4 gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <img
              src={`/upload/${authContext?.currentUser?.profile_pic}`}
              alt={authContext?.currentUser?.name}
              className="w-[30px] h-[30px] rounded-[50%] object-cover "
            />
          </div>
          <span className="text-[14px] uppercase ">
            {authContext?.currentUser?.name}
          </span>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px] rounded-sm  ">
            <img src={Friends} alt="friends icon" className="w-[30px]" />
            <span className="text-[14px]">Friends</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px] rounded-sm ">
            <img src={Groups} alt="group icon " className="w-[30px]" />
            <span className="text-[14px]">Groups</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Market} alt="marketplace icon" className="w-[30px]" />
            <span className="text-[14px]">Marketplace</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Watch} alt="watch icon" className="w-[30px]" />
            <span className="text-[14px]">Watch</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Memories} alt="memories icon" className="w-[30px]" />
            <span className="text-[14px]">Memories</span>
          </div>
        </div>

        <hr className={hr} />

        <div className="flex flex-col gap-[10px]">
          <span className="text-[16px]">Your shortcuts</span>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Events} alt="events icon" className="w-[30px]" />
            <span className="text-[14px]">Events</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Gaming} alt="gaming icon" className="w-[30px]" />
            <span className="text-[14px]">Gaming</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Gallery} alt="gallery icon" className="w-[30px]" />
            <span className="text-[14px]">Gallery</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Videos} alt="videos icon" className="w-[30px]" />
            <span className="text-[14px]">Videos</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Messages} alt="message icon" className="w-[30px]" />
            <span className="text-[14px]">Messages</span>
          </div>
        </div>

        <hr className={hr} />

        <div className="flex flex-col gap-[10px]">
          <span className="text-[16px]">Others</span>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Fund} alt="fundraiser icon" className="w-[30px]" />
            <span className="text-[14px]">Fundraiser</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Tutorials} alt="tutorial icon" className="w-[30px]" />
            <span className="text-[14px]">Tutorials</span>
          </div>
          <div className="flex items-center gap-[10px] cursor-pointer hover:bg-[rgba(0,0,0,0.2)] p-[10px]  rounded-sm">
            <img src={Courses} alt="courses icon" className="w-[30px]" />
            <span className="text-[14px]">Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}
