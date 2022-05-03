import { NavLink } from "react-router-dom";

interface GroupProps {
  children?: JSX.Element | JSX.Element[];
  title: string;
  length?: number;
  path: string
}

const GroupWrapper = ({ title, path,length, children }: GroupProps) => {
  return (
    <section className="flex flex-col items-center mb-12">
      <h2 className="self-start text-3xl mb-6">
        <NavLink to={path} className="hover:text-amber-600">
          {title}
          {
            length ? <span className="border rounded-xl p-1 ml-2 bg-slate-200 text-black">
              {length}
            </span> : null
          }
        </NavLink>
      </h2>
      {children}
    </section>
  );
};

export default GroupWrapper;
