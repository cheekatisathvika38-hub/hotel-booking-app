import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">StayEasy</Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/hotels">Hotels</NavLink>

          {user ? (
            <>
              <NavLink to="/my-bookings">My Bookings</NavLink>
              {user.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
              <NavLink to="/profile">Profile</NavLink>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="btn btn-primary">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;