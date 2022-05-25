import { IBook } from "../types/book";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";

import { startBooks } from "../temp/books";
import { addBook, addBooks } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { clearBooks, fetchAllBooks } from "../store/books/books";

interface FormValues {
  title: string;
  photoURL: string;
  year: string;
  description: string;
  authors: { author: string }[];
  ISBN: string;
  rating: string;
}

const AddBook = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      authors: [{ author: "" }],
    },
    mode: "onBlur",
  });
  const { fields, remove, append } = useFieldArray<FormValues>({
    control,
    name: "authors",
  });
  const navigate = useNavigate();
  const { books } = useAppSelector((store) => store.books);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, []);

  // Для удобства
  const loadStartBooks = async (data: IBook) => {
    addBooks(data);
  };

  const removeAuthor = (idx: number) => {
    if (fields.length > 1) {
      remove(idx);
    }
  };
  const onSubmit: SubmitHandler<FormValues> = async ({
    ISBN,
    authors,
    description,
    photoURL,
    rating,
    title,
    year,
  }) => {
    const newBook: IBook = { photoURL, title } as IBook;
    newBook.authors = authors.map((author) => author.author);

    if (description) {
      newBook.description = description;
    }
    if (rating) {
      newBook.rating = Number(rating);
    }
    if (year) {
      newBook.year = Number(year);
    }
    if (ISBN) {
      newBook.ISBN = ISBN;
    }

    if (
      !books.find(
        (book) =>
          book.title === newBook.title &&
          book.authors.includes(newBook.authors[0])
      )
    ) {
      await addBook(newBook);
      dispatch(clearBooks())
      window.alert("Книга успешно добавлена");
      navigate("/catalog");
    } else {
      window.alert("Книга этого автора с таким название уже существует");
    }
  };
  return (
    <>
      <form
        className="w-full flex justify-center flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl mb-6 text-center sm:text-3xl">
          Добавление новой книги
        </h1>
        <label className="flex flex-col">
          Название книги*
          {errors.title?.message && (
            <span className="ml-2 text-red-500">{errors.title.message}</span>
          )}
          <input
            {...register("title", {
              required: "Обязательное поле",
              maxLength: { value: 100, message: "Не более 100 симовлов" },
            })}
            name="title"
            type="text"
            className="input mb-6"
          />
        </label>
        <label className="flex flex-col">
          URL Обложки*
          {errors.photoURL?.message && (
            <span className="ml-2 text-red-500">{errors.photoURL.message}</span>
          )}
          <input
            {...register("photoURL", {
              required: "Обязательное поле",
              pattern: {
                value:
                  /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/gm,
                message: "Вставьте ссылку на обложку",
              },
            })}
            className="input mb-6"
          />
        </label>
        <div className="flex flex-col mb-6">
          Авторы*
          {errors.authors && (
            <span className="ml-2 text-red-500">
              Удалите лишние поля или заполните их
            </span>
          )}
          {fields.map((field, idx) => (
            <div key={idx} className="w-full flex justify-between">
              <div className="w-full flex mb-2">
                <input
                  className="input w-full"
                  key={field.id}
                  defaultValue={field.author}
                  {...register(`authors.${idx}.author`, { required: true })}
                />
                {fields.length > 1 ? (
                  <button
                    className="w-10 h-10"
                    onClick={removeAuthor.bind(null, idx)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          <button
            type={"button"}
            className="border w-full p-2 rounded-lg bg-slate-200 hover:bg-slate-300 "
            onClick={() => append({})}
          >
            Добавить автора
          </button>
        </div>
        <label className="flex flex-col mb-6">
          Описание{" "}
          <textarea
            {...register("description")}
            className="text-left max-h-40 min-h-8 overflow-y-auto outline-none bg-inherit border-b-2 mx-4 text-lg focus:border-orange-400"
          />
        </label>

        <label className="flex flex-col mb-6">
          Год издания
          {errors.year?.message && (
            <span className="ml-2 text-red-500">{errors.year.message}</span>
          )}
          <input
            {...register("year", {
              min: {
                value: 1800,
                message: "Год публикации не может быть раньше 1800",
              },
              max: {
                value: new Date().getFullYear(),
                message: "Вы из будущего?)",
              },
            })}
            className="input"
          />
        </label>
        <label className="flex flex-col mb-6">
          Рейтинг
          {errors.rating?.message && (
            <span className="ml-2 text-red-500">{errors.rating.message}</span>
          )}
          <input
            {...register("rating", {
              min: {
                value: 0,
                message: "Ну куда уж ниже?",
              },
              max: {
                value: 10,
                message: "Максимальная оценка - 10",
              },
            })}
            className="input"
            type={"number"}
          ></input>
        </label>
        <label className="flex flex-col mb-2">
          ISBN
          {errors.ISBN?.message && (
            <span className="ml-2 text-red-500">{errors.ISBN.message}</span>
          )}
          <input
            {...register("ISBN", {
              required: false,
              pattern: {
                value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm,
                message: "Это не похоже на ISBN",
              },
            })}
            className="input"
          ></input>
        </label>
        <button
          type={"submit"}
          className={
            "border rounded-2xl p-3 bg-slate-300 hover:bg-slate-400 mt-3"
          }
        >
          Добавить
        </button>
      </form>
      {/* Для удобства */}
      <div className="flex justify-center flex-col">
        <button
          disabled={books.length ? true : false}
          type={"button"}
          className={
            "border rounded-2xl p-3 bg-slate-100 hover:bg-slate-200 mt-3"
          }
          onClick={() => {
            for (let i = 0; i < startBooks.length; i++) {
              loadStartBooks(startBooks[i]);
            }
          }}
        >
          Загрузить стартровые книги
        </button>
        <p className="text-red-500">Работает только если все книжки удалены</p>
      </div>
    </>
  );
};

export default AddBook;
