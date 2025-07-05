import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  // Runs once after the first render
  useEffect(() => {
    console.log("Header component mounted");

    // Optional: Cleanup function
    return () => {
      console.log("Header component unmounted");
    };
  }, []);

  return (
    <div className="header">
      <div className="logo">
        {/* You can put your logo here */}
        <h2>🍔 Foodie App</h2>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to='/'>Home</Link>
            </li>
          <li>
            <Link to='/about'>About us</Link>
            </li>
          <li> 
            <Link to='/contacts'>Contacts</Link>
            </li>
          <li>Cart</li>
          <li>
            <button
              className="login"
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
      </div>
    </div>
  );
};

export default Header;
