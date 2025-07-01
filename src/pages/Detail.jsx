import { useParams } from "react-router-dom";
import members from "../data/members";
import { useState } from "react";

function Detail() {
  const { id } = useParams();
  const member = members.find((m) => m.id === parseInt(id));
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  if (!member) return <div>해당 멤버를 찾을 수 없습니다.</div>;

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 flex flex-col md:flex-row gap-8">
      {/* 왼쪽 영역: 이미지, 이름, 설명, 타입, 좋아요 */}
      <div className="flex flex-col items-center w-full md:w-1/2">
        <img
          src={member.image}
          alt={member.name}
          className="w-40 h-40 object-cover rounded-lg mb-4 shadow"
        />
        <h2 className="text-xl font-bold">{member.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{member.description}</p>

        <div className="flex gap-2 mt-3 flex-wrap justify-center">
          {member.type.map((t, idx) => (
            <span
              key={idx}
              className="bg-orange-100 text-orange-600 px-2 py-1 text-xs rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={handleLike}
          className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
            hasLiked
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {hasLiked ? "❤️좋아요" : "❤️ 좋아요"} {likes}
        </button>
      </div>

      {/* 오른쪽 영역: MBTI, 취미, 깃허브, 코멘트 */}
      <div className="w-full md:w-1/2 space-y-4">
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p className="text-sm font-semibold">
            <strong>MBTI:</strong> {member.mbti || "정보 없음"}
          </p>
          <p className="text-sm font-semibold mt-2">
            <strong>취미:</strong> {member.hobby || "정보 없음"}
          </p>
          <p className="text-sm font-semibold mt-2">
            <strong>GitHub:</strong>{" "}
            {member.github ? (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {member.github}
              </a>
            ) : (
              "정보 없음"
            )}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p className="text-sm font-semibold mb-2">
            코멘트 남기기{" "}
            <span role="img" aria-label="comment">
              💬
            </span>
          </p>
          <input
            type="text"
            placeholder="응원의 한마디를 남겨주세요!"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;
