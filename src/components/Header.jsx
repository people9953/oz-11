import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import { motion, AnimatePresence } from "framer-motion";

function Header({ onSearch }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [input, setInput] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearch = debounce((value) => {
    if (onSearch) onSearch(value);
  }, 300);

  useEffect(() => {
    debouncedSearch(input);
    return () => debouncedSearch.cancel();
  }, [input]);

  useEffect(() => {
    setIsSearchOpen(false);
    setInput("");
  }, [location.pathname]);

  // 외부 클릭 시 검색창 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full p-4 bg-white shadow-md">
      <div className="relative w-full flex items-center justify-between">
        {/* 왼쪽 홈 버튼 */}
        <motion.h1
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-800 ml-4"
        >
          베스트 일레븐
        </motion.h1>

        {/* 가운데 FE 버튼 */}
        <motion.div
          onClick={() => setIsSearchOpen((prev) => !prev)}
          whileHover={{ scale: 1.1 }}
          className="text-xl font-semibold text-blue-500 cursor-pointer hover:text-blue-700 absolute left-1/2 -translate-x-1/2"
        >
          FE
        </motion.div>

        {/* 오른쪽 로그인/회원가입 버튼 */}
        <div className="flex gap-2 mr-4">
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
            className="origin-center mt-6 w-full max-w-sm mx-auto"
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
    </div>
  );
}

export default Header;
