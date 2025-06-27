import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const pages = [
    { name: "카드 보기", path: "/cards" },
    { name: "예정 기능 1", path: "/plan1" },
    { name: "예정 기능 2", path: "/plan2" },
    { name: "예정 기능 3", path: "/plan3" },
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">기능 선택</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {pages.map((page, idx) => (
          <div
            key={idx}
            onClick={() => navigate(page.path)}
            className="bg-yellow-100 p-8 rounded-xl shadow cursor-pointer hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold text-center">{page.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
