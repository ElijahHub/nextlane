import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../context/auth.context";
import { makeRequest } from "../utils";

export default function Stories() {
  return (
    <div className="flex justify-between gap-[20px] lg:gap-[10px] mb-0 md:mb-[30px] h-[50px] md:h-[150px] lg:h-[250px] ">
      <div className="relative w-[50px] h-[50px] md:w-full md:h-full flex-none md:flex-1 rounded-[10px] overflow-hidden">
        <img src="" alt="" className="w-full h-full object-cover" />

        <span className="hidden md:block absolute bottom-[10px] left-[10px]  text-white font-medium "></span>

        <button className="absolute bottom-0 left-0 right-0 top-0 md:bottom-[40px] md:left-[10px] flex items-center justify-between text-white bg-[#5271ff] border-none rounded-[50%] w-[30px] h-[30px] cursor-pointer text-[30px] ">
          +
        </button>
      </div>
      //TODO set condition for displaying this and requires data array for
      mapping
      <div className="relative w-[50px] h-[50px] md:w-full md:h-full flex-none md:flex-1 rounded-[10px] overflow-hidden">
        <img src="" alt="" className="w-full h-full object-cover" />
        <span className="hidden md:block absolute bottom-[10px] left-[10px]  text-white font-medium "></span>
      </div>
    </div>
  );
}
