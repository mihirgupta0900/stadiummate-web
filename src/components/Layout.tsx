import { type FC, type PropsWithChildren } from "react";
import Sidebar from "./shared/Sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="mx-4 grid h-[100vh] w-full grid-cols-6">
        <div className="col-span-1 hidden lg:block"></div>
        <div className="col-span-6 my-[2%] lg:col-span-5">{children}</div>
      </div>
    </>
  );
};

export default Layout;
