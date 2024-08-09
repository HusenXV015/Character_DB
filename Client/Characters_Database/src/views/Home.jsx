import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import pacmanLoad from "../assets/Bean-Eater@1x-1.0s-200px-200px.svg";
import Card from "../components/Card";
import CardMoogle from "../components/CardMoogle";

export default function Home({ url }) {
  const [characters, setCharacters] = useState([]);
  const [moogleCharacters, setMoogleCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageOriginal, setCurrentPageOriginal] = useState(1);
  const [currentPageMoogle, setCurrentPageMoogle] = useState(1);
  const charactersPerPage = 6;

  const [pageRange, setPageRange] = useState([1, 5]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");

  async function fetchCharacter() {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No token found");
      }
      const { data: originalData } = await axios.get(`${url}/characters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: newData } = await axios.get(
        "https://www.moogleapi.com/api/v1/characters"
      );

      setCharacters(originalData.characters);
      setMoogleCharacters(newData);
    } catch (error) {
      Toastify({
        text: error.response?.data?.error || "Fetch character error",
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
    fetchCharacter();
  }, []);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleSort(e) {
    const { id, value } = e.target;
    if (id === "sortColumn") {
      setSortColumn(value);
    } else if (id === "sortOrder") {
      setSortOrder(value);
    }
  }

  const filteredCharactersOriginal = characters
    .filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });

  const filteredCharactersMoogle = moogleCharacters
    .filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });

  const indexOfLastCharacterOriginal = currentPageOriginal * charactersPerPage;
  const indexOfFirstCharacterOriginal = indexOfLastCharacterOriginal - charactersPerPage;
  const currentCharactersOriginal = filteredCharactersOriginal.slice(
    indexOfFirstCharacterOriginal,
    indexOfLastCharacterOriginal
  );
  const totalPagesOriginal = Math.ceil(
    filteredCharactersOriginal.length / charactersPerPage
  );

  const indexOfLastCharacterMoogle = currentPageMoogle * charactersPerPage;
  const indexOfFirstCharacterMoogle =
    indexOfLastCharacterMoogle - charactersPerPage;
  const currentCharactersMoogle = filteredCharactersMoogle.slice(
    indexOfFirstCharacterMoogle,
    indexOfLastCharacterMoogle
  );
  const totalPagesMoogle = Math.ceil(
    filteredCharactersMoogle.length / charactersPerPage
  );

  function goToNextPageOriginal() {
    setCurrentPageOriginal((prev) => Math.min(prev + 1, totalPagesOriginal));
  }

  function goToPreviousPageOriginal() {
    setCurrentPageOriginal((prev) => Math.max(prev - 1, 1));
  }

  function goToPageOriginal(page) {
    setCurrentPageOriginal(page);
  }

  function goToNextPageMoogle() {
    if (currentPageMoogle === pageRange[1]) {
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
    }
    setCurrentPageMoogle((prev) => Math.min(prev + 1, totalPagesMoogle));
  }

  function goToPreviousPageMoogle() {
    if (currentPageMoogle === pageRange[0] && pageRange[0] > 1) {
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
    }
    setCurrentPageMoogle((prev) => Math.max(prev - 1, 1));
  }

  function goToPageMoogle(page) {
    setCurrentPageMoogle(page);
    if (page >= pageRange[1]) {
      setPageRange([pageRange[0] + 5, pageRange[1] + 5]);
    } else if (page < pageRange[0]) {
      setPageRange([pageRange[0] - 5, pageRange[1] - 5]);
    }
  }

  return (
    <>
      <div id="PAGE-HOME" className="p-3">
        <form action="" method="get" className="flex justify-center mt-4">
          <input
            type="search"
            name="search"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/2 p-2 border border-gray-300 rounded-full"
          />
        </form>

        <div className="flex justify-center mt-4">
          <label htmlFor="sortColumn" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortColumn"
            className="p-2 border border-gray-300 rounded-full"
            onChange={handleSort}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
          <select
            id="sortOrder"
            className="p-2 border border-gray-300 rounded-full ml-2"
            onChange={handleSort}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>

        {loading ? (
          <div className="mt-32 flex justify-center items-center">
            <img src={pacmanLoad} alt="Loading" />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-8">Original Characters</h2>
            <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
              {currentCharactersOriginal.map((character) => (
                <Card
                  key={character.id}
                  character={character}
                  url={url}
                  fetchCharacter={fetchCharacter}
                />
              ))}
            </main>
            <div className="flex justify-center my-4">
              <button
                className="p-2 border border-gray-300 rounded-full mr-2"
                onClick={goToPreviousPageOriginal}
                disabled={currentPageOriginal === 1}
              >
                &lt;
              </button>
              {[...Array(totalPagesOriginal)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`p-2 border border-gray-300 rounded-full mr-2 ${
                    currentPageOriginal === index + 1
                      ? "bg-gray-800 text-white"
                      : ""
                  }`}
                  onClick={() => goToPageOriginal(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="p-2 border border-gray-300 rounded-full"
                onClick={goToNextPageOriginal}
                disabled={currentPageOriginal === totalPagesOriginal}
              >
                &gt;
              </button>
            </div>

            <h2 className="text-2xl font-bold mt-8">Moogle API Characters</h2>
            <main className="grid grid-cols-3 gap-5 px-10 my-8 bg-white">
              {currentCharactersMoogle.map((character) => (
                <CardMoogle key={character.id} character={character} />
              ))}
            </main>
            <div className="flex justify-center my-4">
              <button
                className="p-2 border border-gray-300 rounded-full mr-2"
                onClick={goToPreviousPageMoogle}
                disabled={currentPageMoogle === 1}
              >
                &lt;
              </button>
              {[...Array(totalPagesMoogle)].map(
                (_, index) =>
                  index + 1 >= pageRange[0] &&
                  index + 1 <= pageRange[1] && (
                    <button
                      key={index + 1}
                      className={`p-2 border border-gray-300 rounded-full mr-2 ${
                        currentPageMoogle === index + 1
                          ? "bg-gray-800 text-white"
                          : ""
                      }`}
                      onClick={() => goToPageMoogle(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
              )}
              <button
                className="p-2 border border-gray-300 rounded-full"
                onClick={goToNextPageMoogle}
                disabled={currentPageMoogle === totalPagesMoogle}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
