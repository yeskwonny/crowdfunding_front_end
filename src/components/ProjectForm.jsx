import { useState, useEffect } from "react";
import { postCreateProject } from "../api/post-project";
import { updateProject } from "../api/put-project";
import InputField from "./InputField";
import Button from "./Button";
import { useParams } from "react-router-dom";
//!todo: check image, loading bar, status messge

function ProjectForm({ projectData = {}, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [project, setProject] = useState({
    title: "",
    director: "",
    genres: "",
    image: "",
    movie_synopsis: "",
    goal: "",
    is_open: true,
    goal_deadline: "",
    ...projectData,
  });
  console.log(projectData);
  console.log(project);

  // checking getting updated data or not
  // object keys in array
  useEffect(() => {
    if (Object.keys(projectData).length > 0) {
      setIsEdit(true);
    }
  }, [projectData]);

  function handleChange(e) {
    const { id, value } = e.target;
    setProject({ ...project, [id]: id === "goal" ? Number(value) : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const {
        title,
        director,
        genres,
        image,
        movie_synopsis,
        goal,
        is_open,
        goal_deadline,
      } = project;

      if (isEdit) {
        const response = await updateProject(
          id,
          title,
          director,
          genres,
          image,
          movie_synopsis,
          goal,
          is_open,
          goal_deadline
        );
        console.log("Project updated:", response);
      }

      const response = await postCreateProject(
        title,
        director,
        genres,
        image,
        movie_synopsis,
        goal,
        is_open,
        goal_deadline
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
            id="movie_synopsis"
            value={project.movie_synopsis}
            type="text"
            onChange={handleChange}
            label="Movie Synopsis"
          />

          {/* <label htmlFor="image">Image</label>
          <input type="file" id="image" /> */}
        </div>
        <div className="movie-target">
          <InputField
            id="goal"
            value={project.goal}
            type="number"
            onChange={handleChange}
            label="Your target"
          />
          <InputField
            id="goal_deadline"
            value={project.goal_deadline}
            type="date"
            onChange={handleChange}
            label="Target Date"
          />
          <InputField
            id="image"
            value={project.image}
            type="text"
            onChange={handleChange}
            label="Image URL"
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
          name={isEdit ? "Edit" : "Create a Project"}
          onClick={handleSubmit}
        ></Button>
      </form>
    </div>
  );
}

export default ProjectForm;
