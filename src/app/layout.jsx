import { Outlet } from "react-router-dom";
import { Header } from "./header.jsx";

export function Layout() {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
