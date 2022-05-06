import { NavLink } from "react-router-dom";

interface GroupProps {
  children?: JSX.Element | JSX.Element[];
  title: string;
  length?: number;
  path: string
  type? : 'col' | 'row'
}

const GroupWrapper = ({ type = 'row', title, path,length, children }: GroupProps) => {
  if (!children) {
    return null
  }

  return (
    <div className="lg:w-8/12 w-full flex flex-col items-center mb-6 flex-grow-0">
      <h2 className="self-start text-2xl md:text-3xl mb-4">
        <NavLink to={path} className="hover:text-amber-600">
          {title}
          {
            length ? <span className="border rounded-xl p-1 ml-2 bg-slate-200 text-black">
              {length}
            </span> : null
          }
        </NavLink>
      </h2>
      {/* TODO СДЕЛАТЬ ЧТОБ БЫЛИ КНОПКИ СКРОЛЛА ИЛИ ПОМЕНЯТЬ ПРИНЦИП, Т.К. С МЫШИ НЕ СКРОЛИТСЯ */}
      <div className={
          type === "row"
          ? "flex flex-row flex-grow-0 flex-shrink-0 w-11/12 overflow-x-auto"
          : "flex flex-col flex-grow-0 flex-shrink-0 w-11/12"
        }>
        {children}
      </div>
    </div>
  );
};

export default GroupWrapper;
