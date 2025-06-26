import { useNavigate } from "react-router-dom";

function Card({ member }) {
  const navigate = useNavigate();

  const types = Array.isArray(member.type) ? member.type : [member.type];

  return (
    <div
      onClick={() => navigate(`/detail/${member.id}`)}
      className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition duration-200 cursor-pointer"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-40 object-cover rounded-md"
      />
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
