import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";
import Loader from "../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchAllBooks } from "../store/books/books";
import { includesStringInArray } from "../utils/includesStringInArray";

const Search = () => {
  const { books, loading } = useAppSelector((store) => store.books);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchAllBooks());
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <GroupWrapper title="Поиск">
      <input
        className="h-14 bg-inherit border-b-2  focus:border-orange-400  lg:text-2xl text-xl w-full outline-none text-center mb-4"
        onChange={(e) => handleChange(e)}
      />
      {loading ? (
        <Loader />
      ) : (
        books
          .filter((book) =>
            book.title.toLowerCase().includes(inputValue.toLowerCase()) || includesStringInArray(inputValue, book.authors)
          )
          .map((book) => <BookCard book={book} key={book.id} />)
      )}
    </GroupWrapper>
  );
};

export default Search;
