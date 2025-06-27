import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Plan1 from "./pages/Plan1";
import Plan2 from "./pages/Plan2";
import Plan3 from "./pages/Plan3";
import SearchResult from "./pages/SearchResult";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Main />} />
          <Route path="/plan1" element={<Plan1 />} />
          <Route path="/plan2" element={<Plan2 />} />
          <Route path="/plan3" element={<Plan3 />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
