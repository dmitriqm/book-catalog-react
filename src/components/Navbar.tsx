import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const navs = [
  { title: "Поиск", to: "/search" },
  { title: "Книги", to: "/books" },
  { title: "Каталог", to: "/catalog" },
];

const Navbar = () => {
  return (
    <nav className="flex items-center border-b h-20 border-slate-200 bg-white">
      <div className="px-4">
        <NavLink to="/" className={""}>
          <img className="h-14" src={logo} alt=""></img>
        </NavLink>
      </div>

      <div className="flex h-full">
        {navs.map(({ title, to }, idx) => (
          <NavLink
            key={idx}
            to={to}
            className={({ isActive }) =>
              "h-full flex mx-1 px-3 items-center justify-center  hover:border-b-2 box-content hover:border-amber-500 hover:text-amber-600 text-xl" +
              `${isActive ? " border-amber-500 text-amber-600 border-b-2" : ""}`
            }
          >
            {title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
