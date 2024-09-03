import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(`${url}/login`, addedData);

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Toastify({
        text: "Success Login",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    } catch (error) {
      console.log(error);

      Toastify({
        text: error.response.data.error,
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
    }
  }

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <body class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white rounded-lg shadow-lg flex w-3/4 max-w-4xl">
          <div class="w-1/2 p-10">
            <h2 class="text-3xl font-semibold text-gray-800 mb-6">
              Login to your Account
            </h2>
            <p class="text-gray-500 mb-8">Welcome back!</p>
            <form onSubmit={handleLogin}>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 font-medium mb-2">
                  <svg
                    class="inline-block w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12l-4-4m0 0l-4 4m4-4v12"
                    ></path>
                  </svg>
                  Email
                </label>
                <input
                  onChange={emailOnChange}
                  type="email"
                  id="email"
                  placeholder="Email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="mb-6">
                <label
                  for="password"
                  class="block text-gray-700 font-medium mb-2"
                >
                  <svg
                    class="inline-block w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12l-4-4m0 0l-4 4m4-4v12"
                    ></path>
                  </svg>
                  Password
                </label>
                <input
                  onChange={passwordOnChange}
                  type="password"
                  id="password"
                  placeholder="Password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
              >
                LOG IN
              </button>
            </form>
            <p class="mt-6 text-gray-500 text-center">
              Don't have an account?{" "}
              <Link to="/register">
              <a href="#" class="text-blue-500 hover:underline">
                Create an account
              </a>
              </Link>
            </p>
            <div className="divider px-10 text-center">OR</div>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>
          </div>
          <div class="w-1/2 bg-blue-500 text-white flex items-center justify-center rounded-r-lg">
            <div class="p-10">
              <div class="flex justify-center mb-6">
                <img
                  src="https://image.similarpng.com/very-thumbnail/2021/08/Gaming-logo-design-template-on-transparent-background-PNG.png"
                  alt="Illustration"
                  class="w-40 h-40"
                />
              </div>
              <h3 class="text-2xl font-semibold mb-2">
                Connect with any device.
              </h3>
              <p class="text-center">
                Everything you need is an internet connection.
              </p>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
