import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import the CSS file for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
// This code defines a NavBar component that uses React Router's Link component to create navigation links for a movie application. The NavBar includes links to the home page and a favorites page, and it is styled with CSS classes for a consistent look and feel. The component is exported for use in other parts of the application.
