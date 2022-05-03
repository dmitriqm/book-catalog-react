import BookCard from "../components/BookCard";
import GroupWrapper from "../components/GroupWrapper";

import { NavLink } from "react-router-dom";
// #TODO Рализовать группирование 

const Catalog = () => {
  return (
    <>
      <article className="flex flex-col items-center mb-12">
        <h2 className="self-start text-3xl mb-6"><NavLink to={'/recomendations'} className='hover:text-amber-600'>Рекомендуем прочитать<span className="border rounded-xl p-1 bg-slate-200 text-black ml-1">10</span></NavLink></h2>
        <BookCard size="big"/>
      </article>

        <GroupWrapper title="2015" length={3} path='/year/2015'>
          <BookCard />
          <BookCard />
          <BookCard />
        </GroupWrapper>
    </>
  );
};

export default Catalog;
