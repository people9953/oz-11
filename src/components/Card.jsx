import { useNavigate } from "react-router-dom";

function Card({ member }) {
  const navigate = useNavigate();

  const types = Array.isArray(member.type) ? member.type : [member.type];

  return (
    <div
      onClick={() => navigate(`/detail/${member.id}`)}
      className="bg-white max-w-xs w-full mx-auto rounded-xl shadow-md p-4 hover:scale-105 transition duration-200 cursor-pointer"
    >
      {/* 이미지가 있을 때만 렌더링 + 선명도 유지 */}
      {member.image && (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-md"
          style={{ imageRendering: "pixelated" }}
        />
      )}

      <h2 className="text-lg font-bold mt-3">{member.name}</h2>
      <p className="text-sm text-gray-600">{member.description}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {types.map((t, i) => (
          <span
            key={i}
            className="inline-block text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Card;
