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
      <div className="flex items-center justify-center min-h-screen rounded-xl">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200">
          <form
            className="bg-orange-300 shadow-md rounded-xl px-12 pt-12 pb-12 mb-12"
            onSubmit={handleLogin}
          >
            <div className="flex justify-center mb-4">
              <h1 className="font-bold text-2xl">Log In</h1>
            </div>
            <h2 className="text-white text-center text-xl font-bold mb-4">
              Sign in to your account
            </h2>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Your email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Your Email"
                onChange={emailOnChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter Your Password"
                onChange={passwordOnChange}
              />
              <a
                className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-700"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign in
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              Don't have an account yet?{" "}
              <Link to="/register">
              <a
                href="/register"
                className="text-orange-500 hover:text-orange-700 font-bold"
              >
                Sign up
              </a>
              </Link>
            </p>
            <div className="divider px-10">OR</div>
            <div className="mt-6 flex justify-center items-center">
              <GoogleLogin onSuccess={googleLogin} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
