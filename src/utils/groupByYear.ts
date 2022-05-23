import lodash from "lodash";
import { IBook } from "../types/book";

interface GroupedBooksByAuthor {
  [year: number | string]: IBook[];
}

export function groupBooksByYear(books: IBook[]): GroupedBooksByAuthor {
  return lodash.groupBy(books, (book) => book.year);
}
