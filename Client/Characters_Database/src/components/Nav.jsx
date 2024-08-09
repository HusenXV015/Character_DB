import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="sticky bg-gray-400 rounded-xl p-4 flex justify-between items-center shadow ">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-900 rounded-full mr-2"></div>
          <Link to="/">
            <h1 className="text-lg text-black font-bold">HOME</h1>
          </Link>
        </div>
        <h1 className="text-center font-mono text-black font-bold text-2xl">
         Character Game DB
        </h1>
        <div className="hidden w-full md:block md:w-auto">
          <Link to="/charaters/add">
            <button className="font-bold text-black mr-4 px-4">
              Add Charaters
            </button>
          </Link>
          <Link to="/login">
            <button onClick={handleLogout} className="font-bold text-black mr-4 py-2 px-4">
              Log Out
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
}
