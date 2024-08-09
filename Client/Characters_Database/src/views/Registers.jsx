import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function Register({ url, User }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (User) {
      setUsername(User.name);
      setEmail(User.email);
      setPassword(User.password);
      setGender(User.gender);
    }
  }, [User]);

  async function handlesubmit(e, username, email, password, gender) {
    try {
      const data = { e, username, email, password, gender };
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
  useEffect(() => {
    handlesubmit();
  });
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Register</h2>
          <form onSubmit={(e) => handlesubmit(e,username,email,password, gender)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-primary"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
                value={username}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary"
            
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
                value={email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
                value={password}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-primary"
              >
                gender
              </label>
              <input
                type="tel"
                id="gender"
                name="gender"
                placeholder="Enter your gender"
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-primary"
                value={gender}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
