import { useState } from "react";
import Card from "../components/Card";
import members from "../data/members";

function Main() {
  const [selectedType, setSelectedType] = useState("전체");

  const HIDDEN_TYPES = [
    "공지알리미",
    "친절왕",
    "카리스마",
    "명강의",
    "백업요정",
    "엘리트",
    "억대연봉",
    "수염",
    "친근함",
  ];

  // 모든 타입 중 버튼에 보여줄 것만 추출 (중복 제거 + 제외)
  const allTypes = Array.from(
    new Set(
      members
        .flatMap((m) => m.type)
        .filter((t) => !HIDDEN_TYPES.some((hidden) => t.includes(hidden)))
    )
  );

  // 필터링
  const filteredMembers =
    selectedType === "전체"
      ? members
      : members.filter((m) =>
          Array.isArray(m.type)
            ? m.type.includes(selectedType)
            : m.type === selectedType
        );

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* 타입 필터 버튼 */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          onClick={() => setSelectedType("전체")}
          className={`px-3 py-1 rounded-full text-sm border ${
            selectedType === "전체"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          전체
        </button>
        {allTypes.map((type, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedType === type
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 카드 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Main;
