import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Toastify from 'toastify-js';
import pacmanLoad from '../assets/Bean-Eater@1x-1.0s-200px-200px.svg';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function DetailMoogle() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originDescription, setOriginDescription] = useState(''); 
  const { id } = useParams();

  async function fetchOriginDescription(characterName) {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCZP4JN-TYoyNarV2v7ZCdHU35l_dlffAU");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Explain the origin of the character ${characterName} in detail.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      setOriginDescription(text);
    } catch (error) {
      console.error('Error fetching origin description:', error);
      setOriginDescription('Could not fetch the origin description.');
    }
  }

  async function bioCharacter() {
    try {
        setLoading(true);
        const { data } = await axios.get(`https://www.moogleapi.com/api/v1/characters/${id}`);
        console.log(data); 
        if (Array.isArray(data) && data.length > 0) {
          setCharacter(data[0]);
          await fetchOriginDescription(data[0].name); 
        } else {
          setCharacter({});
        }
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.error || 'An error occurred',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: '#EF4C54',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bioCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-32 flex justify-center items-center">
        <img src={pacmanLoad} alt="Loading" />
      </div>
    );
  }

  if (!character) {
    return <p className="text-center mt-32">Character not found</p>;
  }

  return (
    <section className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Character</h2>
            <p className="text-base font-extrabold text-black sm:text-base">Name: {character.name || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Japanese Name: {character.japaneseName || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Age: {character.age || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Gender: {character.gender || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Race: {character.race || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Job: {character.job || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Height: {character.height || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Weight: {character.weight || 'Unknown'}</p>
            <p className="text-base font-extrabold text-black sm:text-base">Origin: {character.origin || 'Unknown'}</p>
            <p className="mt-4 text-gray-600 text-lg">{character.description || 'No description available.'}</p>
          </div>
          <div className="mt-12 md:mt-0">
            {character.pictures && character.pictures.length > 0 ? (
              <img
                src={character.pictures[0].url}
                alt={character.name}
                className="object-cover rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-700 text-base">No image available</p>
            )}
          </div>
        </div>
        <div className="mt-8">
                <p className="mt-4 text-gray-600 text-lg"><strong>Origin Description:</strong> {originDescription || 'Fetching origin description...'}</p>
                </div>
      </div>
    </section>
  );
}
