import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import pacmanLoad from "../assets/Bean-Eater@1x-1.0s-200px-200px.svg";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Detail({ url }) {
  const [characters, setCharacter] = useState({});
  const [loading, setLoading] = useState(false);
  const [originDescription, setOriginDescription] = useState(''); // Full origin description text
  const [displayedText, setDisplayedText] = useState(''); // Text being displayed as typed
  const { id } = useParams();

  async function fetchOriginDescription(characterName,characterGameName) {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCZP4JN-TYoyNarV2v7ZCdHU35l_dlffAU");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Explain the origin of the character ${characterName} from ${characterGameName} in detail.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setOriginDescription(text);
    } catch (error) {
      console.error('Error fetching origin description:', error);
      setOriginDescription('Could not fetch the origin description.');
    }
  }

  useEffect(() => {
    if (originDescription) {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < originDescription.length) {
          setDisplayedText((prev) => prev + originDescription.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust the speed of the typing effect here (in milliseconds)

      return () => clearInterval(typingInterval);
    }
  }, [originDescription]);

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
      if (data.characters && data.characters.name) {
        await fetchOriginDescription(data.characters.name, data.characters.gameName); // Fetch origin description
      }
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
                <div className="bg-zinc-300 rounded-xl shadow-xl">
                <p className="mt-4 text-gray-600 text-lg">
                  {characters.description}
                </p>
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
            <div className="mt-8 bg-slate-300 shadow-xl rounded-md">
              <p className="mt-4 text-gray-600 text-lg"><strong>Origin Description : </strong> { displayedText || 'Fetching origin description...'}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
