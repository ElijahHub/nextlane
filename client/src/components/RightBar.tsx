import { useContext } from "react";
import { suggestion, friends, activities } from "../constants";
import { rightBarStyle } from "../styles";
import { DarkModeContext } from "../context/darkMode.context";

export default function RightBar() {
  const darkContext = useContext(DarkModeContext);

  const { rightBar, item, span, p } = rightBarStyle(darkContext?.darkMode);

  return (
    <div className={`hide-scrollbar ${rightBar} `}>
      <div className="p-[20px]">
        <div className={item}>
          <span className="text-gray-400">Suggestions For You</span>
          {suggestion.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between my-[20px]"
            >
              <div className="relative flex items-center gap-[20px]  ">
                <img
                  src={item.img}
                  alt={item.name + "profile pic"}
                  className=" w-[40px] h-[40px] rounded-[50%] object-cover "
                />
                <span className={span}>{item.name}</span>
              </div>
              <div className="text-white flex items-center justify-center gap-1 ">
                <button className="bg-[#5271ff] p-2 rounded-sm cursor-pointer ">
                  follow
                </button>
                <button className="bg-[#f0544f] p-2 rounded-sm cursor-pointer ">
                  dismiss
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={item}>
          <span className="text-gray-400">Latest Activities</span>
          {activities.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between my-[20px]"
            >
              <div className="relative flex items-center gap-[20px]  ">
                <img
                  src={item.img}
                  alt={item.spanName}
                  className=" w-[40px] h-[40px] rounded-[50%] object-cover "
                />
                <p className={p}>
                  <span className={span}>{item.spanName}</span> {item.desc}
                </p>
              </div>
              <span>{item.time}</span>
            </div>
          ))}
        </div>

        <div className={item}>
          <span className="text-gray-400">Online Friends</span>
          {friends.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between my-[20px]"
            >
              <div className="relative flex items-center gap-[20px]  ">
                <img
                  src={item.img}
                  alt={item.name}
                  className=" w-[40px] h-[40px] rounded-[50%] object-cover "
                />
                <div className=" w-[12px] h-[12px] rounded-[50%] bg-lime-600 absolute top-[0] left-[30px] " />
                <span className={span}>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
