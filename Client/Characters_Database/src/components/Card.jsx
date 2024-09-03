import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Card({ character, url, fetchCharacter }) {
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/characters/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success delete",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      fetchCharacter(); 
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.error || "Failed to delete character",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  function handleDetail(id) {
    navigate(`/charaters/${id}`);
  }

  function handleEdit(id) {
    navigate(`/charaters/edit/${id}`);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={character.imgUrl} alt="Character" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{character.name}</div>
        <p className="text-gray-700 text-base">{character.gameName}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full"
          onClick={() => handleDetail(character.id)}
        >
          Detail
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-full"
          onClick={() => handleEdit(character.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-full"
          onClick={() => handleDelete(character.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
