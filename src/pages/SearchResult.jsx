import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import members from "../data/members";

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(query?.toLowerCase() || "")
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        🔍 "{query}" 검색 결과 ({filtered.length}명)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((member) => (
          <Card key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
