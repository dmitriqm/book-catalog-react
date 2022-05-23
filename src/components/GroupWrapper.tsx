import { NavLink } from "react-router-dom";

interface GroupProps {
  children?: React.ReactNode;
  title: string;
  length?: number;
  path?: string;
}

const GroupWrapper = ({ title, path, length, children }: GroupProps) => {
  if (!children) {
    return null;
  }
  return (
    <div className="lg:w-8/12 w-full flex flex-col items-center mb-6 flex-grow-0">
      <h2 className="self-start text-2xl md:text-3xl mb-4">
        {path ? (
          <NavLink to={path} className="hover:text-amber-600">
            {title}
            {length ? (
              <span className="border rounded-xl p-1 ml-2 bg-slate-200 text-black">
                {length}
              </span>
            ) : null}
          </NavLink>
        ) : (
          title
        )}
      </h2>
      <div className="flex flex-col flex-grow-0 flex-shrink-0 w-11/12">
        {children}
      </div>
    </div>
  );
};

export default GroupWrapper;
