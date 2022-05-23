import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IBook } from "../../types/book";
import { fetchOneBook } from "../../utils/firebase";

interface BookState {
  loading: boolean;
  book: IBook;
  error: SerializedError | null;
}

const initialState: BookState = {
  book: {} as IBook,
  error: null,
  loading: false,
};

export const fetchBookById = createAsyncThunk(
  "book/fetchBooksById",
  async (id: string) => {
    return await fetchOneBook(id);
  }
);

export const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBook(state: BookState) {
      state.book = {} as IBook;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
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
  },
});

export const { resetBook } = booksSlice.actions;
export default booksSlice.reducer;
