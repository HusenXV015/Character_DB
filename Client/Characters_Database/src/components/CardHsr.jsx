import { useNavigate } from "react-router-dom";

export default function CardHSR({ character }) {
    const navigate = useNavigate();

    function handleDetail(id) {
        navigate(`/hsr-characters/${id}`);
    }

    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                    className="w-full"
                    src={character.img}
                    alt={character.name}
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{character.name}</div>
                    <p className="text-gray-700 text-base">
                        Element: {character.element}
                    </p>
                    <p className="text-gray-700 text-base">
                        Path: {character.path}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-full" onClick={() => handleDetail(character.id)}>
                        Detail
                    </button>
                </div>
            </div>
        </>
    );
}
