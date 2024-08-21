import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import LogOut from "./LogOut";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
  <div
  className="bg-[#161a23] text-white sticky h-screen flex flex-col transition-[width] duration-300 ease-in-out"
  style={{ width: sidebarOpen ? "250px" : "90px" }}
>
  <button
    className="absolute top-[48px] right-[-18px] w-8 h-8 rounded-full bg-[#161a23] shadow-[0_0_4px_black,0_0_7px_black] flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out"
    style={{ transform: sidebarOpen ? "initial" : "rotate(180deg)" }}
    onClick={ModSidebaropen}
  >
    <ArrowBackIosRoundedIcon />
  </button>

  <div className="bg-[#2D3039] pb-3 grid justify-center items-center transition-all duration-300 ease-in-out">
    <div
      className="flex mt-5 mb-2 justify-center cursor-pointer transition-all duration-300 ease-in-out"
      style={{ transform: sidebarOpen ? "scale(1.5)" : "scale(2.0)" }}
    >
      {/* <img src={logo} className="max-w-full h-auto" /> */}
      <AgricultureRoundedIcon />
    </div>
    <h2
      className="transition-opacity duration-300 ease-in-out"
      style={{ display: sidebarOpen ? "block" : "none" }}
    >
      Niger Fitness Gym
    </h2>
  </div>

  <div className="flex-grow">
    {linksArray.map(({ icon, label, to }) => (
      <div
        className="my-8 px-[25%] transition-opacity duration-300 ease-in-out hover:bg-[#222831]"
        key={label}
      >
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex items-center no-underline py-[6px] text-white h-[50px]${
              isActive ? ` active` : ``
            }`
          }
        >
          <div className="px-[8px] py-[16px]">{icon}</div>
          {sidebarOpen && <span>{label}</span>}
        </NavLink>
      </div>
    ))}
  </div>

  <div className="h-[1px] w-full bg-red-500 my-[24px]" />

  <div className="mb-4">
    <LogOut />
  </div>
</div>
  );
}
//#region Data links
const linksArray = [
  {
    label: "Inicio",
    icon: <HomeRoundedIcon />,
    to: "/admin",
  },
  {
    label: "Añadir Cliente",
    icon: <PersonAddAlt1RoundedIcon />,
    to: "/admin/addClient",
  },

  {
    label: "Estadísticas",
    icon: <LeaderboardRoundedIcon />,
    to: "/admin/reports",
  },
];

//#endregion
