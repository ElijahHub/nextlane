import { useContext } from "react";

import { DarkModeContext } from "../context/darkMode.context";
import { Stories, Posts, Share } from "../components";
import { homeStyle } from "../styles";

export default function Home() {
  const darkContext = useContext(DarkModeContext);

  return (
    <div className={homeStyle(darkContext?.darkMode)}>
      <Stories />
      <Share />
      <Posts userId="" />
    </div>
  );
}
