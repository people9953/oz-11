import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import members from "../data/members";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = members.find((m) => m.id === Number(id));

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!member?.id) return;

    const storedLikes = localStorage.getItem(`likes_${member.id}`);
    const storedLiked = localStorage.getItem(`hasLiked_${member.id}`);
    if (storedLikes) setLikes(Number(storedLikes));
    if (storedLiked === "true") setHasLiked(true);
  }, [member?.id]);

  const handleLike = () => {
    const updated = hasLiked ? likes - 1 : likes + 1;
    setLikes(updated);
    setHasLiked(!hasLiked);
    localStorage.setItem(`likes_${member.id}`, updated.toString());
    localStorage.setItem(`hasLiked_${member.id}`, (!hasLiked).toString());
  };

  if (!member) return <p>존재하지 않는 멤버입니다.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 왼쪽: 사진, 이름, 타입, 좋아요 */}
      <div className="flex flex-col items-center text-center">
        <img
          src={member.image || "/character/default.png"}
          alt={member.name}
          className="w-full max-w-[300px] aspect-square rounded-lg object-cover"
        />
        <h2 className="text-2xl font-bold mt-4">{member.name}</h2>
        <p className="text-sm text-gray-600">{member.description}</p>

        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {member.type?.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={handleLike}
          className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold transition ${
            hasLiked
              ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {hasLiked ? "💔 좋아요 취소" : "❤️ 좋아요"} {likes}
        </button>
      </div>

      {/* 오른쪽: MBTI, 취미, GitHub */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-md shadow-sm text-sm">
        <p>
          <strong>MBTI:</strong> {member.mbti || "정보 없음"}
        </p>
        <p>
          <strong>취미:</strong> {member.hobby || "정보 없음"}
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          {member.github ? (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {member.github.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            "정보 없음"
          )}
        </p>
      </div>
    </div>
  );
}

export default Detail;
