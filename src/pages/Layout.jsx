import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function Layout() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${query.trim()}`;
    }
  };

  return (
    <div>
      {/* 상단바 */}
      <header className="bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <Link to="/" className="text-blue-600 font-bold text-xl">
            베스트 일레븐
          </Link>

          <button
            onClick={handleSearchToggle}
            className="text-lg text-gray-800 font-semibold"
          >
            FE
          </button>

          <div className="space-x-4">
            <button className="text-sm text-gray-600 hover:underline">
              로그인
            </button>
            <button className="text-sm text-gray-600 hover:underline">
              회원가입
            </button>
          </div>
        </div>

        {/* 검색창 */}
        {showSearch && (
          <form onSubmit={handleSubmit} className="max-w-screen-xl mx-auto p-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="이름으로 검색하세요"
              className="w-full border border-gray-300 rounded p-2"
            />
          </form>
        )}
      </header>

      {/* 본문 */}
      <main className="max-w-screen-xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
