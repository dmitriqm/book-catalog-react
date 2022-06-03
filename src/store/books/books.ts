import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit"
import { IBook } from "../../types/book"
import { BookGroupType } from "../../types/BookGroupType"
import { fetchBooks } from "../../utils/firebase"

import { groupBooksByAuthor } from "../../utils/groupByAuthors"
import { groupBooksByYear } from "../../utils/groupByYear"

interface BookState {
  loading: boolean
  data: IBook
  error: SerializedError | null
}

interface BooksState {
  recommendations: IBook[]
  groupedBooks:
    | {
        [year: string]: IBook[]
      }
    | {
        [author: string]: IBook[]
      }
  groupType: BookGroupType
  books: IBook[]
  error: SerializedError | null
  loading: boolean
}

const initialState: BooksState = {
  books: [] as IBook[],
  error: null,
  groupType: BookGroupType.Year,
  groupedBooks: {},
  loading: false,
  recommendations: [] as IBook[],
}

export const fetchAllBooks = createAsyncThunk("books/fetchBooks", async () => {
  return await fetchBooks()
})

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    groupRecommended(state: BooksState) {
      state.recommendations = state.books
        .filter((book) =>
          book.year ? new Date().getFullYear() - book.year >= 3 : false
        )
        .filter((book) => (book.rating ? book.rating > 4 : false))
    },
    groupBooks(state: BooksState) {
      switch (state.groupType) {
        case BookGroupType.Year:
          state.groupedBooks = groupBooksByYear(state.books)
          break

        case BookGroupType.Author:
          state.groupedBooks = groupBooksByAuthor(state.books)
          break
      }
    },
    changeGroupType(state: BooksState, action: PayloadAction<BookGroupType>) {
      state.groupType = action.payload
    },
    clearBooks(state: BooksState) {
      state.books = []
      state.recommendations = []
      state.groupedBooks = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false
        state.books = action.payload.sort((a, b) =>
          a.title > b.title ? 1 : -1
        )
        state.error = null
        booksSlice.caseReducers.groupRecommended(state)
        booksSlice.caseReducers.groupBooks(state)
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export const { groupBooks, changeGroupType, groupRecommended, clearBooks } =
  booksSlice.actions
export default booksSlice.reducer
