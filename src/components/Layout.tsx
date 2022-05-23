import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <header className="flex mb-6 bg-white">
        <Navbar />
      </header>
      <main className="flex mx-2 flex-col items-center">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
