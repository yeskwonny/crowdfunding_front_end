import "../components/Menu.css";
import { Link } from "react-router-dom";
const movieGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Science Fiction (Sci-Fi)",
  "Fantasy",
  "Thriller",
  "Mystery",
  "Crime",
  "Animation",
  "Documentary",
  "Musical",
  "War",
  "Western",
  "Romantic Comedy (Rom-Com)",
  "Action Thriller",
  "Horror Comedy",
  "Superhero",
  "Post-Apocalyptic",
];

function Menu() {
  return (
    <div>
      <div className="menu-container">
        {movieGenres.map((genre, index) => {
          return (
            <Link
              to={`/projects/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`}
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
