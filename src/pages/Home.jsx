import { useOutletContext } from "react-router-dom";
import { members } from "../data/members";
import Card from "../components/Card";

function Home() {
  const { search } = useOutletContext();

  const filtered = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {filtered.map((member) => (
        <Card key={member.id} member={member} />
      ))}
    </div>
  );
}

export default Home;
