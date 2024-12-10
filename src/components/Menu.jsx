import "../components/Menu.css";
import { Link } from "react-router-dom";
import { movieGenres } from "../data";

function Menu() {
  return (
    <div>
      <div className="menu-container">
        {movieGenres.map((genre, index) => {
          return (
            <Link
              to={`/projects?genre=${genre.toLowerCase().replace(/\s+/g, "-")}`}
              key={index}
              className="menu-item"
            >
              {genre}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
