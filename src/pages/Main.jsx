import Card from "../components/Card";
import members from "../data/members";

function Main() {
  return (
    <div className="max-w-screen-xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {members.map((member) => (
        <Card key={member.id} member={member} />
      ))}
    </div>
  );
}

export default Main;
