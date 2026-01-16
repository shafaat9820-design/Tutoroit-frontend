import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";
import "../styles/navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("authChange", syncUser);
    return () => window.removeEventListener("authChange", syncUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3 className="logo">Welcome to Tutoroit</h3>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user && user.role === "TUTOR" && (
          <Link to="/create-post">Create Post</Link>
        )}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
