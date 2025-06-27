import { useState } from "react";
import Card from "../components/Card";
import members from "../data/members";

function Main() {
  const [selectedType, setSelectedType] = useState("전체");

  // 모든 타입 모음 (중복 제거)
  const allTypes = Array.from(new Set(members.flatMap((m) => m.type)));

  // 필터링된 멤버 리스트
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
      {/* 타입 필터 버튼들 */}
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

      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Main;
