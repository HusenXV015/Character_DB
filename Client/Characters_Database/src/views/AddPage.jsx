import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import CharacterForm from "../components/CharacterForm";

export default function CharactersForm({ url }) {
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    name,
    gender,
    gameName,
    gameId,
    description,
    imgUrl,
    skill,
    weapon
  ) {
    e.preventDefault();
    try {
      const dataAdded = {
        name,
        gender,
        gameName,
        gameId,
        description,
        imgUrl,
        skill,
        weapon,
      };
      await axios.post(
        `${url}/characters/add`,
        dataAdded,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Toastify({
        text: "Success add new data",
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

      navigate("/");
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

  return (
    <>
      <CharacterForm url={url} handleSubmit={handleSubmit} nameprop="Add Character" />
    </>
  );
}
