import { useState } from "react";
import postCreateProject from "../api/post-project";
//!todo: check image, loading bar, status messge
function ProjectForm() {
  const [project, setProject] = useState({
    title: "",
    director: "",
    genres: "",
    synopsis: "",
    target: "",
    is_open: true,
    targetDate: "",
  });

  function handleOnChange(e) {
    const { id, value } = e.target;
    setProject({ ...project, [id]: id === "target" ? Number(value) : value });
    console.log(id, value);
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const { title, director, genres, synopsis, is_open, target, targetDate } =
        project;

      const response = await postCreateProject(
        title,
        director,
        genres,
        synopsis,
        //image,
        is_open,
        target,
        targetDate
      );
      console.log(response);
    } catch (error) {
      console.error("Error trying to create a project:", error.message);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <div>
      <form>
        <div className="movie-basic">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={project.title}
            onChange={handleOnChange}
          ></input>
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            value={project.director}
            onChange={handleOnChange}
          ></input>
        </div>
        <div className="movie-detail">
          <label htmlFor="genres">Genres</label>
          <input
            type="genres"
            id="genres"
            value={project.genres}
            onChange={handleOnChange}
          ></input>
          <label htmlFor="synopsis">Movie Synopsis</label>
          <input
            type="text"
            id="synopsis"
            value={project.synopsis}
            onChange={handleOnChange}
          ></input>
          {/* <label htmlFor="image">Image</label>
          <input type="file" id="image" /> */}
        </div>
        <div className="movie-target">
          <label htmlFor="target">Your target</label>
          <input
            type="number"
            id="target"
            value={project.target}
            onChange={handleOnChange}
          ></input>
          <label htmlFor="targetDate">target date</label>
          <input type="date" id="targetDate" onChange={handleOnChange}></input>
        </div>
        <button type="submit" onClick={handleOnSubmit}>
          Create a project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
