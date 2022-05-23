import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import Recomendations from "./pages/Recomendations";
import Search from "./pages/Search";
import Author from "./pages/Author";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
import Year from "./pages/Year";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={'catalog'} />}></Route>
          <Route path="search" element={<Search />} />
          <Route path="add" element={<AddBook />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="year/:year" element={<Year />} />
          <Route path="author/:author" element={<Author />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="recommendations" element={<Recomendations />} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
