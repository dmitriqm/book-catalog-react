import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firestore";
import { IBook } from "../../types/book";

interface BookState {
  loading: boolean;
  book: IBook;
  error: SerializedError | null;
  isDeleted: boolean
}

const initialState: BookState = {
  book: {} as IBook,
  error: null,
  loading: false,
  isDeleted: false
};

export const fetchBookById = createAsyncThunk(
  "book/fetchBooksById",
  async (id: string) => {
    const docSnap = await getDoc(doc(db, "books", id));
    const book = docSnap.data() as IBook;
    return book;
  }
);

export const deleteBookById = createAsyncThunk(
  "book/deleteBookById",
  async (id: string) => {
    await deleteDoc(doc(db, "books", id));
  }
);

export const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBook(state: BookState) {
      state.book = {} as IBook
      state.isDeleted = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload as IBook;
        state.error = null;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    builder.addCase(deleteBookById.pending, (state) => {
      state.loading = true
      state.error = null
    }).addCase(deleteBookById.fulfilled, (state) => {
      state.loading = false
      state.error = null
      state.isDeleted = true
    }).addCase(deleteBookById.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  },
});

export const {resetBook} = booksSlice.actions;
export default booksSlice.reducer;
