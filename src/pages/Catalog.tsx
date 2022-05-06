import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";

import { NavLink } from "react-router-dom";
// #TODO Рализовать группирование 

const books: {
  authors: string[]
  title: string
  photoURL: string
}[] = [
  {authors: ['Павел Иевлев'], title:"Практическое руководство по винокурению", photoURL: "https://cv9.litres.ru/pub/c/pdf-kniga/cover_max1500/63995791-pavel-ievlev-prakticheskoe-rukovodstvo-po-vinokureniu-domashnee-p-63995791.jpg" }, 
  {authors: ['Марк Мэнсон'], title:"Тонкое искусство пофигизма. Парадоксальный способ жить счастливо", photoURL:"https://img-gorod.ru/26/031/2603103_detail.jpg"},
  {authors:['Роберт Мартин'], title:"Идеальный программист. Как стать профессионалом разработки ПО", photoURL:"https://static.insales-cdn.com/images/products/1/615/175415911/44611067.jpg"},
  {authors:['Алан Купер'], title:"Психбольница в руках пациентов", photoURL:"https://cdn1.ozone.ru/multimedia/1022254904.jpg"},
  {authors:['Стивен Хокинг', 'Люси Хокинг'], title:"Джордж и Большой взрыв", photoURL:"https://img3.labirint.ru/rc/d9212ab0f8cfa911359e8afa4270c98d/363x561q80/books36/356621/cover.jpg?1563692215"}
]

const Catalog = () => {
  return (
    <>
      <div className="w-full lg:w-8/12 flex flex-col items-center mb-6">
        <h2 className="self-start text-2xl mb-6 sm:text-3xl"><NavLink to={'/recomendations'} className='hover:text-amber-600'>Рекомендуем прочитать<span className="border rounded-xl p-1 bg-slate-200 text-black ml-1">10</span></NavLink></h2>
        <BookCard authors={['Марк Мэнсон']} title="Тонкое искусство пофигизма" photoURL="https://img-gorod.ru/26/031/2603103_detail.jpg"/>
      </div>
        <GroupWrapper title="2015" length={3} path='year/2015'>
          {books.map((book, idx) => <BookCard authors={book.authors} photoURL={book.photoURL} title={book.title} key={idx} />)}
        </GroupWrapper>
    </>
  );
};

export default Catalog;
