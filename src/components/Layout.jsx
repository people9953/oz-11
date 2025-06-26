import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header onSearch={setSearch} />
      <main className="p-6">
        <Outlet context={{ search }} />
      </main>
    </div>
  );
}

export default Layout;
