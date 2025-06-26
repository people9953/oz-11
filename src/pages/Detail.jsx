import { useParams } from "react-router-dom";
import { members } from "../data/members";

function Detail() {
  const { id } = useParams();
  const member = members.find((m) => m.id === parseInt(id));

  if (!member) {
    return (
      <div className="p-6 text-center text-red-500">
        멤버를 찾을 수 없습니다.
      </div>
    );
  }

  const types = Array.isArray(member.type) ? member.type : [member.type];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 왼쪽: 사진 + 이름/타입 */}
      <div className="md:col-span-1 flex flex-col items-center">
        {/* ① 사진 */}
        <img
          src={member.image}
          alt={member.name}
          className="w-60 h-60 object-cover rounded-xl mb-4"
        />

        {/* ② 이름 + 타입 */}
        <h2 className="text-2xl font-bold">{member.name}</h2>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {types.map((t, i) => (
            <span
              key={i}
              className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 오른쪽: 상세 내용 + 코멘트 */}
      <div className="md:col-span-2 flex flex-col gap-4">
        {/* ③ 주요 내용 */}
        <div className="bg-white rounded-lg shadow-md p-4 text-sm text-gray-700 space-y-2">
          <p>
            <strong>MBTI:</strong> {member.mbti || "정보 없음"}
          </p>
          <p>
            <strong>취미:</strong> {member.hobby || "정보 없음"}
          </p>
          <p>
            <strong>좌우명:</strong> {member.motto || "정보 없음"}
          </p>
        </div>

        {/* ④ 코멘트 입력 */}
        <div className="bg-gray-50 rounded-lg shadow-inner p-4">
          <p className="text-sm font-semibold mb-2">코멘트 남기기 💬</p>
          <input
            type="text"
            placeholder="응원의 한마디를 남겨주세요!"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;
