interface BookCardProps {
  size?: 'big' | 'small', 
}

const BookCard = ({size = 'small'}: BookCardProps) => {
  return (
    <article className="flex w-[97%] border cursor-pointer bg-slate-50 mb-2">
      {/* <section className="flex h-64 w-64 m-4">
        <img
          src="https://img-gorod.ru/26/031/2603103_detail.jpg"
          alt=""
          className="flex flex-shrink-0 flex-grow-0"
        ></img>
      </section> */}
      <section className="pr-16">
        <section className="m-3 ml-4 overflow-hidden whitespace-nowrap">
          <a className="text-base">Марк Мэнсон</a>
        </section>
        <section>
          <a className="text-xl leading-3">
            Тонкое исскусство пофигизма. 
            Парадоксальный способ жить счастливо
          </a>
        </section>
      </section>
    </article>
  );
};

export default BookCard;
