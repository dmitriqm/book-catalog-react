import React, { useState } from "react";
import { IBook } from "../types/book";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../firestore";

import { startBooks } from "../temp/books";

const AddBook = () => {
  const [inputs, setInputs] = useState({
    
  } as IBook)

  const loadStartBooks = async (data: IBook) => {
    const newCityRef = doc(collection(db, "books"));
    await setDoc(newCityRef, data);
  } 

  return (
    <>
      <h2 className="text-2xl mb-6 sm:text-3xl">Добавление новой книги</h2>
      <form className="w-full">
        <label className="flex flex-col">
          Название книги*
          <input className="input mb-6" value={inputs.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputs({...inputs, title: e.target.value}) }/>
        </label>
        <label className="flex flex-col">
          URL Обложки*
          <input className="input mb-6"></input>
        </label>
        <label className="flex flex-col mb-6">
          Авторы*
          <input className="input mb-0"></input>
          <button type={'button'} className='self-start' onClick={() => console.log('hello')}>Добавить автора</button>
        </label>
        <label className="flex flex-col mb-6">
          Описание <textarea className="text-left max-h-40 min-h-8 overflow-y-auto outline-none bg-inherit border-b-2 mx-4 text-lg focus:border-orange-400"></textarea>
        </label>
        <label className="flex flex-col mb-6">
          Год издания
          <input className="input" type={"number"}></input>
        </label>
        <label className="flex flex-col mb-6">
          Рейтинг
          <input className="input" type={'number'}></input>
        </label>
        <label className="flex flex-col mb-2">
          ISBN
          <input className="input"></input>
        </label>
        <button type={"submit"} className={'border rounded-2xl p-3 bg-slate-300 hover:bg-slate-400 mt-3'}>Добавить</button>
      </form>
      <button className={'border rounded-2xl p-3 bg-slate-300 hover:bg-slate-400 mt-3'} onClick={() => {
        for (let i = 0; i < startBooks.length; i++) {
          loadStartBooks(startBooks[i])
        }
      }}>Загрузить стартровые книги</button>
    </>
  );
};

export default AddBook;

