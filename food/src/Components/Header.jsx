import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  useEffect(() => {
    console.log("Header component mounted");
    return () => {
      console.log("Header component unmounted");
    };
  }, []);

  const online = useOnlineStatus();

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-emerald-600">
        🍔 Foodie App
      </div>

      {/* Navigation */}
      <nav className="flex items-center">
        <ul className="flex items-center space-x-6 text-gray-700 font-medium">
          <li className="text-sm">Online Status: {online ? "✔" : "❌"}</li>
          <li>
            <Link to="/" className="hover:text-emerald-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-emerald-600 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="hover:text-emerald-600 transition">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/gorcery" className="hover:text-emerald-600 transition">
              Grocery
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-emerald-600 transition">
              Cart
            </Link>
          </li>
          <li>
            <button
              className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-600 transition"
              onClick={() =>
                setBtnNameReact((prev) =>
                  prev === "Login" ? "Logout" : "Login"
                )
              }
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
