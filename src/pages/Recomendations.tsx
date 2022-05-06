import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";

const books: {
  authors: string[];
  title: string;
  photoURL: string;
}[] = [
  {
    authors: ["Павел Иевлев"],
    title: "Практическое руководство по винокурению",
    photoURL:
      "https://cv9.litres.ru/pub/c/pdf-kniga/cover_max1500/63995791-pavel-ievlev-prakticheskoe-rukovodstvo-po-vinokureniu-domashnee-p-63995791.jpg",
  },
  {
    authors: ["Марк Мэнсон"],
    title: "Тонкое искусство пофигизма. Парадоксальный способ жить счастливо",
    photoURL: "https://img-gorod.ru/26/031/2603103_detail.jpg",
  },
  {
    authors: ["Роберт Мартин"],
    title: "Идеальный программист. Как стать профессионалом разработки ПО",
    photoURL:
      "https://static.insales-cdn.com/images/products/1/615/175415911/44611067.jpg",
  },
  {
    authors: ["Алан Купер"],
    title: "Психбольница в руках пациентов",
    photoURL: "https://cdn1.ozone.ru/multimedia/1022254904.jpg",
  },
  {
    authors: ["Стивен Хокинг", "Люси Хокинг"],
    title: "Джордж и Большой взрыв",
    photoURL:
      "https://img3.labirint.ru/rc/d9212ab0f8cfa911359e8afa4270c98d/363x561q80/books36/356621/cover.jpg?1563692215",
  },
];

const Recomendations = () => {
  return (
    <GroupWrapper type="col" title="Рекомендуем" path="/recomendations">
      {books.map((book, idx) => (
        <BookCard
          authors={book.authors}
          photoURL={book.photoURL}
          title={book.title}
          key={idx}
          type="long"
        />
      ))}
    </GroupWrapper>
  );
};

export default Recomendations;
