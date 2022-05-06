import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { toggleMenu } from "../store/layout/layout";

import logo from "../assets/logo.svg";
import menu from "../assets/menu.svg";

const navs = [
  // { title: "Поиск", to: "/search" },
  { title: "Каталог", to: "/catalog" },
  { title: "Рекомендации", to: "recomendations" },
];

const Navbar = () => {
  const { isOpen } = useAppSelector((store) => store.layout.navmenu);
  const dispatch = useAppDispatch();

  return (
    <nav className="flex flex-col lg:flex-row justify-between lg:h-20 border-slate-200 bg-white w-full flex-grow-0 flex-shrink-0">
      <div className="flex justify-between border-b flex-auto flex-shrink-0">
        <div className="flex h-full items-center flex-shrink-0">
          <div className="px-2 lg:px-4 m-1 py-1">
            <NavLink to="/" className="w-fit h-fit">
              <img className="w-12 lg:h-14 lg:w-14" src={logo} alt="" />
            </NavLink>
          </div>
          <div className="hidden lg:flex h-full">
            {navs.map(({ title, to }, idx) => (
              <NavLink
                key={idx}
                to={to}
                className={({ isActive }) =>
                  "h-full flex mx-1 px-3 items-center justify-center  hover:border-b-2 box-content hover:border-amber-500 hover:text-amber-600 text-xl" +
                  `${
                    isActive
                      ? " border-amber-500 text-amber-600 border-b-2"
                      : ""
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </div>
        </div>
        <button
          className="mx-4 lg:hidden"
          onClick={() => dispatch(toggleMenu())}
        >
          <img className="w-8" src={menu} alt="" />
        </button>
      </div>

      <div
        className={`lg:h-0 lg:hidden ${
          isOpen ? `h-40` : "h-0"
        } overflow-hidden transition-all duration-700 ease-out flex flex-col`}
      >
        {isOpen ? (
          <>
            {navs.map(({ title, to }, idx) => (
              <NavLink
                key={idx}
                to={to}
                onClick={() => setTimeout(() => dispatch(toggleMenu()), 50)}
                className={({ isActive }) =>
                  "h-full flex mx-1 px-3 items-center justify-center  hover:border-b-2 box-content hover:border-amber-500 hover:text-amber-600 text-xl" +
                  `${
                    isActive
                      ? " border-amber-500 text-amber-600 border-b-2"
                      : ""
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
