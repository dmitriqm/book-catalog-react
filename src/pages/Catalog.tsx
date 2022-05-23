import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect, useState } from "react";
import {
  changeGroupType,
  fetchAllBooks,
  groupBooks,
} from "../store/books/books";
import { BookGroupType } from "../types/BookGroupType";
import Loader from "../components/Loader/Loader";

const Catalog = () => {
  const { books, groupedBooks, error, loading, groupType, recommendations } =
    useAppSelector((store) => store.books);
  const dispatch = useAppDispatch();
  const [recommendedIndex, setRecommendedIndex] = useState(
    Math.floor(Math.random() * recommendations.length)
  );

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  useEffect(() => {
    dispatch(groupBooks());
  }, [groupType, books]);

  if (error) {
    <h2>Ошибка! Не получилось загрузить книги</h2>;
  }
  const changeRecommendedIndex = () => {
    let newIndex = Math.floor(Math.random() * recommendations.length);
    while (newIndex === recommendedIndex && newIndex < recommendations.length) {
      newIndex = Math.floor(Math.random() * recommendations.length);
    }
    setRecommendedIndex(newIndex);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full flex items-center flex-col mb-6">
        {recommendations[0] ? (
          <>
            <GroupWrapper
              title="Рекомендуем прочитать"
              path="/recommendations"
              length={recommendations.length}
            >
              <BookCard
                book={
                  recommendations[
                    recommendedIndex < recommendations.length
                      ? recommendedIndex
                      : recommendedIndex - 1
                  ]
                }
              />
            </GroupWrapper>
            {recommendations.length > 1 ? (
              <button
                className="rounded-lg border px-4 py-2 bg-slate-200 hover:bg-slate-300"
                onClick={changeRecommendedIndex.bind(null)}
              >
                Показать другую
              </button>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="w-full">
        {books[0] && (
          <div className="flex justify-center items-center mb-2">
            <span className="mr-2">Сортировать по</span>
            <button
              className={`border rounded-lg px-4 py-2 ${
                groupType === BookGroupType.Year
                  ? "bg-slate-300"
                  : "bg-slate-200"
              } hover:bg-slate-300 mr-1`}
              onClick={() => dispatch(changeGroupType(BookGroupType.Year))}
            >
              Году
            </button>
            <button
              className={`border rounded-lg px-4 py-2 ${
                groupType === BookGroupType.Author
                  ? "bg-slate-300"
                  : "bg-slate-200"
              } hover:bg-slate-300 mr-1`}
              onClick={() => dispatch(changeGroupType(BookGroupType.Author))}
            >
              Автору
            </button>
          </div>
        )}
        <div className="w-full flex flex-col items-center">
          {Object.keys(groupedBooks)
            .filter((groupTitle) => groupTitle !== "undefined")
            .sort(() => -1)
            .map((groupTitle) => (
              <GroupWrapper
                key={groupTitle}
                length={groupedBooks[groupTitle].length}
                title={groupTitle}
                path={`/${groupType}/${groupTitle}`}
              >
                {groupedBooks[groupTitle].map((book) => {
                  return <BookCard book={book} key={book.id} />;
                })}
              </GroupWrapper>
            ))}
          {groupType === BookGroupType.Year && groupedBooks["undefined"] ? (
            <GroupWrapper
              title="Год не указан"
              path={`/${BookGroupType.Year}/undefined`}
              length={groupedBooks["undefined"].length}
            >
              {groupedBooks["undefined"].map((book) => {
                return <BookCard book={book} key={book.id} />;
              })}
            </GroupWrapper>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Catalog;
