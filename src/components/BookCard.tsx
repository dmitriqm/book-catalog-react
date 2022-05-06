import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BookCard.css";

interface BookCardProps {
  authors: string[];
  title: string;
  photoURL: string;
  type?: "long" | "short";
  //TODO сделать обязательным
  id?: number;
}

const BookCard = ({
  type = "short",
  authors,
  title,
  photoURL,
  id,
}: BookCardProps) => {
  const navigate = useNavigate();

  //TODO Тут будет id:number
  const handleClick = (title: string) => {
    navigate(`/book/${title}`);
  };

  const handleLinkClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={(e) => handleClick(title)}
      className={
        `bookcard flex cursor-pointer flex-shrink-0 mb-1 ${
          type === "short" 
            ?"flex-col w-32 items-center pb-4 mr-1 mx-1 md:w-40 xl:w-52"
            :"flex-row border h-32 mb-2 rounded-md overflow-hidden w-full pr-2 bg-white"
        }`
      }
    >
      {/* Book Photo */}

      <div className={
        type === "short" 
          ?`flex w-full justify-center items-center flex-shrink-0 flex-grow-0` 
          :"flex flex-shrink-0 flex-grow-0"
      }>
        <img
          src={photoURL}
          alt=""
          className={
            `flex overflow-hidden flex-shrink-0 h-22 flex-grow-0 ${
              type === "long" 
                ? 'rounded-md'
                :''
              }`
          }
        />
      </div>

      {/* Author and Title */}
      <div className={`w-full flex-col flex ${
        type === "short" 
          ? 'justify-start'
          : 'mx-2 justify-center' 
      }`}>
        {/* Author */}
        <div className={`bookcard__author text-slate-500 h-6 pr-2 truncate`}>
          <span className="text-sm font-bold md:text-lg">
            {authors.map((author, idx) => (
              <a
                onClick={(e) => handleLinkClick(e)}
                className="hover:text-amber-400"
                title={`${author}`}
                key={idx}
                href={`author/${author}`}
              >
                {author}
                {idx === authors.length - 1 ? null : (
                  <span className="text-slate-500">, </span>
                )}
              </a>
            ))}
          </span>
        </div>

        {/* Title */}
        <div className={`bookcard__title text-sm leading-4 md:leading-5 md:text-xl font-bold w-full truncate whitespace-normal ${
          type === "short" 
            ? 'h-8 md:h-[3.8rem] xl:h-[6.4rem]'
            : 'h-12'
        }`}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
