import { MouseEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IBook } from "../types/book"
import "./styles/BookCard.css"

interface BookCardProps {
  book: IBook
}

const BookCard = ({
  book: { id, authors, photoURL, title },
}: BookCardProps) => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/book/${id}`)
  }

  const handleLinkClick = (event: MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={(e) => handleClick(id)}
      className={`bookcard flex cursor-pointer flex-shrink-0 "flex-row border h-32 mb-2 rounded-md overflow-hidden w-full pr-2 bg-white`}
    >
      {/* Book Photo */}

      <div className={"flex flex-shrink-0 flex-grow-0"}>
        <img
          src={photoURL}
          alt=""
          className={`flex overflow-hidden flex-shrink-0 h-full flex-grow-0 rounded-md`}
        />
      </div>

      {/* Author and Title */}
      <div className={`w-full flex-col flex mx-2 justify-center`}>
        {/* Author */}
        <div className={`bookcard__author text-slate-500 h-6 pr-2 truncate`}>
          <span className="text-sm font-bold md:text-lg">
            {authors.map((author, idx) => (
              <Link
                onClick={(e) => handleLinkClick(e)}
                className="hover:text-amber-400"
                title={`${author}`}
                key={idx}
                to={`/author/${author}`}
              >
                {author}
                {idx === authors.length - 1 ? null : (
                  <span className="text-slate-500">, </span>
                )}
              </Link>
            ))}
          </span>
        </div>

        {/* Title */}
        <div
          className={`bookcard__title text-sm leading-4 md:leading-5 md:text-xl font-bold w-full truncate whitespace-normal h-12`}
        >
          {title}
        </div>
      </div>
    </div>
  )
}

export default BookCard
