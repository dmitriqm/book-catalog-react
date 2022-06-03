import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Loader from "../components/Loader/Loader"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { fetchBookById, resetBook } from "../store/book/book"
import { clearBooks } from "../store/books/books"
import { deleteBookById } from "../utils/firebase"

const Book = () => {
  const { book, loading, error } = useAppSelector((store) => store.book)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchBookById(id!))
  }, [])

  const deleteHandler = async () => {
    if (window.confirm("Вы уверены, что хотитите удалить книгу?")) {
      dispatch(clearBooks())
      await deleteBookById(id!)
      navigate("/catalog")
      dispatch(resetBook())
    }
  }

  if (error) {
    return <>Книга не найдена</>
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : book && book.title ? (
        <div className="w-full bg-white rounded-xl flex flex-col items-center p-4">
          {/* Book Photo */}
          <div className="w-full flex flex-col items-center lg:flex-row">
            <div
              className={
                "flex flex-shrink-0 flex-grow-0 w-56 mb-4 items-center"
              }
            >
              <img
                src={book.photoURL}
                alt=""
                className={`flex overflow-hidden flex-shrink-0 h-full flex-grow-0 rounded-md`}
              />
            </div>

            <div className={`w-full flex-col flex mx-2 justify-center pl-2`}>
              {/* Title */}
              <div className={`text-2xl font-bold lg:text-left text-center`}>
                <h1>{book.title}</h1>
              </div>
              <div className="mb-3">
                {/* Author */}
                <div>
                  <h3 className="text-slate-500 font-bold text-lg">
                    Автор{book.authors.length > 1 ? "ы" : ""}
                  </h3>
                  <ul className="px-2">
                    {book.authors.map((author, idx) => (
                      <li key={idx}>
                        <Link
                          className="text-slate-700 font-bold hover:text-amber-400"
                          title={`${author}`}
                          to={`/author/${author}`}
                        >
                          {author}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {book.year ? (
                  <div>
                    <h3 className="text-slate-500 font-bold text-lg">Год</h3>
                    <span className="px-2 text-slate-700 font-bold">
                      {book.year}
                    </span>
                  </div>
                ) : null}
                {book.rating ? (
                  <div>
                    <h3 className="text-slate-500 font-bold text-lg">
                      Рейтинг
                    </h3>
                    <div className="px-2">{book.rating}/10</div>
                  </div>
                ) : null}
                {book.ISBN ? (
                  <div>
                    <h3 className="text-slate-500 font-bold text-lg">ISBN</h3>
                    <div className="px-2">{book.ISBN}</div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* DESCRIPTION */}
          </div>
          {book.description ? (
            <div>
              <h3 className="text-slate-500 font-bold text-xl">Описание</h3>
              <div className="px-2">{book.description}</div>
            </div>
          ) : null}

          <button
            className="border rounded-2xl bg-slate-300 hover:bg-slate-400 mt-3 w-24 h-10"
            onClick={deleteHandler.bind(null)}
          >
            Удалить
          </button>
        </div>
      ) : (
        <h2>Книга не найдена</h2>
      )}
    </>
  )
}

export default Book
