import { useEffect } from "react";
import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";
import Loader from "../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchAllBooks } from "../store/books/books";

const Recommendations = () => {
  const { recommendations, loading } = useAppSelector((store) => store.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  return (
    <GroupWrapper title="Рекомендуем" path="/recommendations">
      {!loading ? (
        <>
          {recommendations.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </GroupWrapper>
  );
};

export default Recommendations;
