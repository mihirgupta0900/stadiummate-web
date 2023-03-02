import { type FC, type PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-[100vh] w-full grid-cols-6">
      <div className="col-span-1  hidden border border-red-700 lg:block">
        I am a sidebar
      </div>
      <div className="col-span-6 border border-red-700 lg:col-span-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
