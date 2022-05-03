import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import Recomendations from "./pages/Recomendations";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={'catalog'} />}></Route>
          <Route path="search" element={<Search />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="recomendations" element={<Recomendations />} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
