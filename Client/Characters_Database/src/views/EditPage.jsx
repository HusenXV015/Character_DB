import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CharacterForm from "../components/CharacterForm";

export default function EditCharacterPage({ url }) {
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchCharacter() {
    try {
      const { data } = await axios.get(`${url}/characters/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` }
      });
      setCharacter(data.character);
    } catch (error) {
      console.error(error);
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
    fetchCharacter();
  }, []);

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
      const dataToUpdate = {
        name,
        gender,
        gameName,
        gameId,
        description,
        imgUrl,
        skill,
        weapon,
      };
      await axios.put(`${url}/characters/${id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Successfully updated character",
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
      console.error(error);
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
      <CharacterForm
        url={url}
        handleSubmit={handleSubmit}
        nameprop={"Edit Character"}
        character={character}
      />
    </>
  );
}
