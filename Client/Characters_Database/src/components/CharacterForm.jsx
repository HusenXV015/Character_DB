import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function CharacterForm({ url, handleSubmit, character, nameprop }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [gameId, setGameId] = useState(1);
  const [skill, setSkill] = useState("");
  const [weapon, setWeapon] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (character) {
      setName(character.name);
      setGender(character.gender);
      setGameName(character.gameName);
      setDescription(character.description);
      setImgUrl(character.imgUrl);
      setSkill(character.skill);
      setWeapon(character.weapon);
      setGameId(character.gameId);
    }
  }, [character]);

  async function fetchGames() {
    try {
      const { data } = await axios.get(`${url}/games`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setGames(data.games);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
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

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="bg-card p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Character yourself
      </h2>
      <form
        onSubmit={(e) =>
          handleSubmit(e, name, gender, gameName, gameId, description, imgUrl, skill, weapon)
        }
      >
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Name:
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Gender:
          </label>
          <input
            onChange={(e) => setGender(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            type="text"
            id="gender"
            placeholder="Enter your gender"
            value={gender}
          />
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Game Name:
          </label>
          <input
            onChange={(e) => setGameName(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            type="text"
            id="gameName"
            placeholder="Enter the game name"
            value={gameName}
          />
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Description:
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            id="description"
            placeholder="Enter description"
            value={description}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Image (URL):
          </label>
          <input
            onChange={(e) => setImgUrl(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            type="text"
            id="imgUrl"
            placeholder="Enter image URL"
            value={imgUrl}
          />
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Weapon:
          </label>
          <input
            onChange={(e) => setWeapon(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            type="text"
            id="weapon"
            placeholder="Enter weapon"
            value={weapon}
          />
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Skill:
          </label>
          <input
            onChange={(e) => setSkill(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            type="text"
            id="skill"
            placeholder="Enter skill"
            value={skill}
          />
        </div>
        <div className="mb-4">
          <label className="block text-muted-foreground mb-2">
            Game ID:
          </label>
          <select
            onChange={(e) => setGameId(e.target.value)}
            className="border border-border rounded-lg p-2 w-full bg-input text-foreground"
            id="gameId"
            value={gameId}
          >
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg p-2 w-full"
          type="submit"
        >
          {nameprop}
        </button>
      </form>
    </div>
  );
}
