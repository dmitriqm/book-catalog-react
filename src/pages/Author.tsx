import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookCard from "../components/BookCard"
import GroupWrapper from "../components/GroupWrapper"
import Loader from "../components/Loader/Loader"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { fetchAllBooks } from "../store/books/books"
import { BookGroupType } from "../types/BookGroupType"
import { groupBooksByAuthor } from "../utils/groupByAuthors"
import { IBook } from "../types/book"

const Author = () => {
  const { author } = useParams()
  const { groupType, groupedBooks, books, loading } = useAppSelector(
    (store) => store.books
  )
  const [authorBooks, setAuthorBooks] = useState([] as IBook[])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchAllBooks())
    }
  }, [])

  useEffect(() => {
    if (groupType === BookGroupType.Author) {
      setAuthorBooks(groupedBooks[author!] || [])
    } else {
      setAuthorBooks(groupBooksByAuthor(books)[author!] || [])
    }
  }, [books])

  if (loading) {
    return <Loader />
  }

  return (
    <GroupWrapper
      title={author! !== "undefined" ? author! : "Год не указан"}
      length={authorBooks.length}
    >
      {authorBooks.length ? (
        <>
          {authorBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </>
      ) : (
        <p>Книги не найдены</p>
      )}
    </GroupWrapper>
  )
}

export default Author
