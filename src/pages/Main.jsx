import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">
        11기 도감에 오신 것을 환영합니다
      </h1>
      <button
        onClick={() => navigate("/home")}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg"
      >
        도감 보러가기 →
      </button>
    </div>
  );
}

export default Main;
