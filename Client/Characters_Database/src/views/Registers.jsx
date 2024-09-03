import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function Register({ url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate()

  async function handleRegister(e, username, email, password, gender) {
    e.preventDefault();
    try {
      const data = { username, email, password, gender };
      await axios.post(`${url}/register`, data);
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

      navigate("/login");
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
       <div className="bg-gray-100">
        <div className="flex min-h-screen">
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
            <div className="max-w-md w-full">
              <h2 className="text-3xl font-bold mb-6">Create your account</h2>
              <p className="text-gray-500 mb-8">Join many clubs in here!</p>

              <form
                action=""
                onSubmit={(e) => handleRegister(e, username, email, password, gender)}
              >
                <div class="mb-4">
                  <label class="block text-gray-700" for="full-name">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 inline-block mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-4a6 6 0 100-12 6 6 0 000 12zm-3-8a2 2 0 114 0 2 2 0 01-4 0zM5 13s1-1 5-1 5 1 5 1v1H5v-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    id="full-name"
                   value={username}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700" for="email">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.94 3.94A2 2 0 014 3h12a2 2 0 011.82 1.18l-7.46 4.03a2 2 0 01-2.12 0L2.94 4.94zM2 6.21l6.25 3.38a4 4 0 003.5 0L18 6.2v7.29A2 2 0 0116 16H4a2 2 0 01-2-2V6.21z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Email :
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="email"
                    id="email"
                    value={email}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700" for="password">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 6V6a2 2 0 014 0v2H8zm-2 4h8v4H6v-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Password :
                  </label>
                  <input
                        onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    id="password"
                   value={password}
                  />
                </div>

                <div class="mb-4">
                  <label class="block text-gray-700" for="full-name">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 inline-block mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-4a6 6 0 100-12 6 6 0 000 12zm-3-8a2 2 0 114 0 2 2 0 01-4 0zM5 13s1-1 5-1 5 1 5 1v1H5v-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Gender :
                  </label>
                  <input
                    onChange={(e) => setGender(e.target.value)}
                    class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    id="full-name"
                   value={gender}
                  />
                </div>

                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  REGISTER
                </button>
              </form>

              <p className="mt-6 text-center text-gray-500">
                You have account?{" "}
                <a href="#" className="text-blue-500">
                  Login now
                </a>
              </p>
            </div>
          </div>

          <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center p-8">
            <div className="text-white">
              <img
                src="https://www.freepnglogos.com/uploads/games-png/games-pad-icon-12.png "
                alt="Illustration"
                className="mb-4 rounded-full w-96 h-96"
              />
              <h3 className="text-2xl font-bold mb-2">Join us!</h3>
              <p>Just go through the boring process of creating an account.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
