import { type FC, type PropsWithChildren } from "react";
import Sidebar from "./shared/Sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-[100vh] w-full grid-cols-6">
      <Sidebar />
      <div className="col-span-6 border border-red-700 lg:col-span-5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
