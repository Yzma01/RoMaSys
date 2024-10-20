import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import PopupQr from "./PopupQr";
import LogOut from "./LogOut";
import { Logo } from "@/public/images";
import Image from "next/image";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className="bg-blueDark border-r-2 text-white sticky h-full flex flex-col transition-[width] duration-300 ease-in-out hover:cursor-pointer"
      style={{ width: sidebarOpen ? "250px" : "90px" }}>
      <button
        className="absolute top-[48px] right-[-18px] w-8 h-8 rounded-full bg-blueDark shadow-[0_0_4px_black,0_0_7px_black] flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out"
        style={{ transform: sidebarOpen ? "initial" : "rotate(180deg)" }}
          onClick={ModSidebaropen}
        >
      <ArrowBackIosRoundedIcon />
      </button>

      <div className="bg-bgGray-1 pb-3 grid justify-center items-center transition-all duration-300 ease-in-out">
        <div
          className="flex mt-5 mb-2 justify-center cursor-pointer transition-all duration-300 ease-in-out"
          style={{ transform: sidebarOpen ? "scale(1.5)" : "scale(2.0)" }}>
          <Image src={Logo} className="z-10"width={20} height={20} />
        </div>
        <h2
          className="transition-opacity duration-300 ease-in-out"
          style={{ display: sidebarOpen ? "block" : "none" }}>
          RoMaSys
        </h2>
      </div>

      <div className="flex-grow">
        {linksArray.map(({ icon, label, to }) => (
          <div
            className="my-8 px-[25%] transition-opacity duration-300 ease-in-out hover:bg-adminBackground"
            key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center no-underline py-[6px] text-white h-[50px]${
                  isActive ? ` active` : ``
                }`
              }>
              <div className="px-[8px] py-[16px]">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

        <PopupQr sidebarOpen={sidebarOpen} />
      </div>

      <div className="h-[1px] w-full bg-white my-[24px]" />

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
    to: "/admin/dashboard",
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
  // {
  //   label: "Mostrar QR",
  //   icon: <QrCode2RoundedIcon />,
  // },
];

//#endregion
