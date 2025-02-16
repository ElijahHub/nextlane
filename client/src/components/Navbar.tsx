import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { DarkModeContext } from "../context/darkMode.context";
import { AuthContext } from "../context/auth.context";

import { navStyle } from "../styles";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");

  //Getting context for darkMode and authentication
  const darkContext = useContext(DarkModeContext);
  const authContext = useContext(AuthContext);

  //Destructuring styles
  const { navbar, left, search, input, right, span, user, img } = navStyle(
    darkContext?.darkMode
  );

  return (
    <div className={navbar}>
      <div className={left}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={span}>nextlane</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <HomeOutlinedIcon />
        </Link>
        {darkContext?.darkMode ? (
          <WbSunnyOutlinedIcon
            onClick={darkContext?.toggle}
            className="cursor-pointer"
          />
        ) : (
          <DarkModeOutlinedIcon
            onClick={darkContext?.toggle}
            className="cursor-pointer"
          />
        )}
        <GridViewOutlinedIcon />
        <div className={search}>
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            className={input}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className={right}>
        <Link
          to={`/profile/${authContext?.currentUser?.id}`}
          style={{ textDecoration: "none" }}
        >
          <PersonOutlinedIcon />
        </Link>
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${authContext?.currentUser?.id}`} className={user}>
          <img
            src={`/upload/${authContext?.currentUser?.profile_pic}`}
            alt={authContext?.currentUser?.username}
            className={img}
          />
          <span className="uppercase">
            {authContext?.currentUser?.username}
          </span>
        </Link>
      </div>
    </div>
  );
}
