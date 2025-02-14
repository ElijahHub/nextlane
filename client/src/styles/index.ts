//* light style variables
const lightBg = "bg-[var(--bg)]";
const lightLogo = "text-[var(--logo)]";
const lightBorder = "border-[var(--border)]";
const lightBgSoft = "bg-[var(--bgSoft)]";
const lightTextColor = "text-[var(--textColor)]";
const lightTextColorSoft = "text-[var(--textColorSoft)]";

//* dark style variables
const darkBg = "bg-[var(--dark-bg)]";
const darkLogo = "text-[var(--dark-logo)]";
const darkBgSoft = "bg-[var(--dark-bgSoft)]";
const darkBorder = "border-[var(--dark-border)]";
const darkTextColor = "text-[var(--dark-textColor)]";
const darkTextColorSoft = "text-[var(--dark-textColorSoft)]";

//* Navbar Styles
export const navStyle = (dark: boolean | undefined) => ({
  navbar: ` sticky flex items-center justify-between py-[10px] px-[20px] h-[50px] border-b ${
    dark
      ? `${darkBorder} ${darkBg} ${darkTextColor}`
      : `${lightBg} ${lightBorder} ${lightTextColor} `
  } top-0 z-[999] `,

  left: ` flex items-center gap-[30px] `,
  span: `font-bold text-[12px] ${dark ? darkLogo : lightLogo} `,
  search: `flex items-center gap-[10px] rounded-[5px] p-[5px] border ${
    dark ? darkBorder : lightBorder
  } `,
  input: `hidden w-[200px] bg-transparent ${
    dark ? darkTextColor : lightTextColor
  } md:w-[500px] md:block focus:outline-none `,

  right: ` hidden md:flex items-center gap-[20px]  `,
  user: `hidden md:flex items-center gap-[10px] font-medium `,
  img: `w-[30px] h-[30px] rounded-[50%] object-cover  `,
});

//* Comment Styles
export const commentStyle = (dark: boolean | undefined) => ({
  img: "w-[40px] h-[40px] rounded-[50%] object-cover ",
  input: `flex-5 p-[10px] bg-transparent border ${
    dark
      ? `${darkBorder} ${darkTextColor}`
      : `${lightBorder} ${lightTextColor} `
  } `,

  button: "bg-[#5271ff] text-white p-[10px] cursor-pointer rounded-[3px]",
  p: `${dark ? darkTextColorSoft : lightTextColorSoft}`,
  write: "flex items-center justify-between gap-[20px] my-[20px] ",
  comment: "my-[30px] flex justify-between gap-[20px]",
  info: "flex-5 flex flex-col items-start gap-[3px]",
  date: "flex-1 self-center text-[#808080] text-[12px]",
});

//* Post Style
export const postStyle = (dark: boolean | undefined) =>
  `rounded-[20px] shadow-[rgba(0,0,0,0.38)] " ${
    dark ? `${darkBg} ${darkTextColor}` : `${lightBg} ${lightTextColor} `
  } `;

//* LeftBar Style
export const leftBarStyle = (dark: boolean | undefined) => ({
  leftBar: `hidden lg:block sticky top-[30px] w-[300px] h-screen  overflow-scroll ${
    dark ? `${darkBg} ${darkTextColor} ` : `${lightBg} ${lightTextColor} `
  } `,

  hr: `my-[20px] border-none h-[0.5px] ${dark ? darkBorder : lightBorder} `,
});

//* RightBar Style
export const rightBarStyle = (dark: boolean | undefined) => ({
  rightBar: ` hidden lg:block flex-3 sticky top-[30px] h-screen  overflow-scroll ${
    dark ? darkBgSoft : lightBgSoft
  } `,
  item: ` p-[20px] mb-[20px] rounded-lg ${
    dark
      ? `${darkBg} shadow-[0px_0px_15px_1px_rgba(100,100,100,0.09)]`
      : `${lightBg} shadow-[0px_0px_15px_1px_rgba(0,0,0,0.09)] `
  } `,
  p: `${dark ? darkTextColorSoft : lightTextColorSoft}`,
  span: `${dark ? darkTextColorSoft : lightTextColorSoft} font-medium `,
});

//* Share Style
export const shareStyle = (dark: boolean | undefined) => ({
  share: `shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] rounded-[20px] mb-[20px] ${
    dark ? `${darkBg} ${darkTextColor}` : `${lightBg} ${lightTextColor} `
  } `,
  input: `border-none flex-1 outline-none  bg-transparent py-[20px] px-[10px] ${
    dark ? darkTextColor : lightTextColor
  } `,
  hr: ` my-[20px] border-none h-[0.5px] ${dark ? darkBorder : lightBorder} `,
});

//* Update Style
export const updateStyle = (dark: boolean | undefined) => ({
  wrapper: `relative m-auto w-full h-full md:w-[40%] md:h-[80%] p-[50px] z-[999] flex flex-col gap-[20px] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.09)] overflow-scroll  ${
    dark ? darkBg : lightBg
  }`,
  input: `p-[5px] border-b bg-transparent text-[#808080] ${
    dark ? darkBorder : lightBorder
  } `,
});

//* Home Style
export const homeStyle = (dark: boolean | undefined) =>
  `p-[10px] md:p-[20px] lg:px-[70px] lg:py-[20px] min-h-[100vh] ${
    dark ? darkBgSoft : lightBgSoft
  }  `;

//* Profile Style
export const profileStyle = (dark: boolean | undefined) => ({
  profile: dark ? darkBgSoft : lightBgSoft,
  uInfo: ` h-[180px] rounded-[20px] p-[50px] py-[150px] flex items-center justify-between mb-[20px] ${
    dark ? `${darkBg} ${darkTextColor}` : `${lightBg} ${lightTextColor} `
  } `,
  a: dark ? darkTextColorSoft : lightTextColorSoft,
  item: `flex items-center gap-[5px] ${
    dark ? darkTextColorSoft : lightTextColorSoft
  } `,
});
