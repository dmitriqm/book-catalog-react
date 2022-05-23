import { IBook } from "../types/book";

interface GroupedBooksByAuthor {
  [author: string]: IBook[];
}

export function groupBooksByAuthor(books: IBook[]): GroupedBooksByAuthor {
  const groupedBooks: GroupedBooksByAuthor = {};

  books.forEach((book) => {
    book.authors.forEach((author) => {
      if (groupedBooks.hasOwnProperty(author)) {
        groupedBooks[author].push(book)
      } else {
        groupedBooks[author] = [book]
      }
    })
  })

  return groupedBooks;
}
