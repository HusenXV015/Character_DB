import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';

export default function CardMoogle({ character }) {
  const navigate = useNavigate();
  function handleDetail(id) {
    navigate(`/moogle-characters/${id}`);
  }

  function handleEdit(id) {
    navigate(`/characters/edit/${id}`);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={character.pictures[0]?.url} alt="Character" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{character.name}</div>
        <p className="text-gray-700 text-base">{character.origin}</p>
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
          onClick={() => handleDelete(moogleCharacter.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
