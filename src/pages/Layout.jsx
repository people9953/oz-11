import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash/debounce";

function Layout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [input, setInput] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearch = debounce((value) => {
    if (value.trim()) {
      navigate(`/search?q=${value.trim()}`);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(input);
    return () => debouncedSearch.cancel();
  }, [input]);

  useEffect(() => {
    setIsSearchOpen(false);
    setInput("");
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 상단 네비게이션 바 */}
      <header className="bg-white shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 relative">
          {/* 홈 버튼 */}
          <motion.h1
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-800 ml-4"
          >
            베스트 일레븐
          </motion.h1>

          {/* FE (검색창 토글) */}
          <motion.div
            onClick={() => setIsSearchOpen((prev) => !prev)}
            whileHover={{ scale: 1.1 }}
            className="text-xl font-semibold text-blue-500 cursor-pointer hover:text-blue-700 absolute left-1/2 -translate-x-1/2"
          >
            FE
          </motion.div>

          {/* 로그인/회원가입 */}
          <div className="flex gap-3 mr-4">
            <button className="text-sm text-gray-600 hover:text-blue-600 font-medium">
              로그인
            </button>
            <button className="text-sm text-gray-600 hover:text-blue-600 font-medium">
              회원가입
            </button>
          </div>
        </div>

        {/* 검색창 */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              key="search"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3 }}
              className="origin-center mt-4 w-full max-w-sm mx-auto"
              ref={searchRef}
            >
              <input
                type="text"
                placeholder="이름으로 검색"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm shadow-md"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 본문 내용 */}
      <main className="max-w-screen-xl mx-auto p-4">
        <Outlet />
      </main>

      {/* 고정 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        ← 뒤로가기
      </button>
    </div>
  );
}

export default Layout;
