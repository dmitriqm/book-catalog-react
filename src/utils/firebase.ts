import { collection, getDoc, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../firestore";
import { IBook } from "../types/book";

export async function fetchBooks(): Promise<IBook[]> {
  const books: IBook[] = [];
  const querySnapshot = await getDocs(collection(db, "books"));

  querySnapshot.forEach((doc) => {
    const el = doc.data() as IBook;
    el.id = doc.id;
    books.push(el);
  });

  return books
}

export async function fetchOneBook(id: string): Promise<IBook> {
  const docSnap = await getDoc(doc(db, "books", id));
  const book = docSnap.data() as IBook;
  return book;
}

export async function deleteBookById(id: string) {
  await deleteDoc(doc(db, "books", id));
}

export async function addBook(book: IBook) {
  await setDoc(doc(db, "books", String(Date.now())), book);
}

export async function addBooks(books:IBook) {
  const newCityRef = doc(collection(db, "books"));
  await setDoc(newCityRef, books);
}
