import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";
import Loader from "../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchAllBooks } from "../store/books/books";
import { IBook } from "../types/book";
import { BookGroupType } from "../types/BookGroupType";
import { groupBooksByYear } from "../utils/groupByYear";

const Author = () => {
  const { year } = useParams();
  const { groupType, groupedBooks, books, loading } = useAppSelector(
    (store) => store.books
  );
  const [yearBooks, setYearBooks] = useState([] as IBook[]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchAllBooks());
    }
  }, []);

  useEffect(() => {
    if (groupType === BookGroupType.Year) {
      setYearBooks(groupedBooks[year!] || []);
    } else {
      setYearBooks(groupBooksByYear(books)[year!] || []);
    }
  }, [books]);


  if (loading) {
    return <Loader />
  }

  return (  
    <GroupWrapper title={year! !== 'undefined' ? year! : 'Год не указан'} length={yearBooks.length}>
      {
        yearBooks.length ? 
          <>
          {yearBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))} 
          </>
          : <p>Книги не найдены</p> 
        
      }
    </GroupWrapper>
  );
};

export default Author;
