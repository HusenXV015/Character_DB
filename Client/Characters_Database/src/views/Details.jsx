

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import pacmanLoad from "../assets/Bean-Eater@1x-1.0s-200px-200px.svg";

export default function Detail({ url }) {
  const [characters, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function bioCharacter() {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const { data } = await axios.get(`${url}/characters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCharacter(data.characters);
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.error || "An error occurred",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bioCharacter();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={pacmanLoad} alt="Loading" />
        </div>
      ) : (
        <section className="bg-gray-100">
          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  About Us
                </h2>
                <p className="text-base font-extrabold text-black sm:text-base">Name: {characters.name}</p>
                <p className="text-base font-extrabold text-black sm:text-base">Gender: {characters.gender}</p>
                <p className="text-base font-extrabold text-black sm:text-base">Game Name: {characters.gameName}</p>
                <p className="text-base font-extrabold text-black sm:text-base">Game Id: {characters.gameId}</p>
                <p className="text-base font-extrabold text-black sm:text-base">Skill: {characters.skill}</p>
                <p className="text-base font-extrabold text-black sm:text-base">Weapon: {characters.weapon}</p>
                <p className="mt-4 text-gray-600 text-lg">
                  {characters.description}
                </p>
                <div className="mt-8">
                  <a className="text-blue-500 hover:text-blue-600 font-medium">
                    User ID: {characters.userId}
                  </a>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <img
                  src={characters.imgUrl} 
                  alt="Character"
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
