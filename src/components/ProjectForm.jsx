import { useState } from "react";
import postCreateProject from "../api/post-project";
import InputField from "./InputField";
import Button from "./Button";
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
  console.log(project);
  function handleChange(e) {
    const { id, value } = e.target;
    setProject({ ...project, [id]: id === "target" ? Number(value) : value });
    console.log(id, value);
  }

  async function handleSubmit(e) {
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
          <InputField
            id="title"
            value={project.title}
            type="text"
            onChange={handleChange}
            label="Title"
          />
          <InputField
            id="director"
            value={project.director}
            type="text"
            onChange={handleChange}
            label="Director"
          />
        </div>
        <div className="movie-detail">
          <InputField
            id="synopsis"
            value={project.synopsis}
            type="text"
            onChange={handleChange}
            label="Movie Synopsis"
          />

          {/* <label htmlFor="image">Image</label>
          <input type="file" id="image" /> */}
        </div>
        <div className="movie-target">
          <InputField
            id="target"
            value={project.target}
            type="number"
            onChange={handleChange}
            label="Your target"
          />
          <InputField
            id="targetDate"
            value={project.targetDate}
            type="date"
            onChange={handleChange}
            label="Target Date"
          />
          //todo! change to select box
          <InputField
            id="genres"
            value={project.genres}
            type="text"
            onChange={handleChange}
            label="genres"
          />
        </div>
        <Button
          type="submit"
          name="Create a Project"
          onClick={handleSubmit}
        ></Button>
      </form>
    </div>
  );
}

export default ProjectForm;
