import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
  return <>
    <header className="mb-6 flex flex-auto bg-white">
      <Navbar />
    </header>
    <main className="flex mx-8 flex-col items-center mb-8">
      <Outlet />
    </main>
  </>
}

export default Layout