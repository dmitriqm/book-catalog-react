import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./layout/layout";
import booksReducer from "./books/books";
import bookReducer from "./book/book";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    books: booksReducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
