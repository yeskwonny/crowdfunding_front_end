import { useState, useEffect } from "react";
import { postCreateProject } from "../api/post-project";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../api/put-project";
import InputField from "./InputField";
import Button from "./Button";
import { useParams } from "react-router-dom";
import SelectBox from "./SelectBox";
import { movieGenres } from "../data";
//!todo: check image, loading bar, status messge

function ProjectForm({ projectData = {}, id }) {
  const navigate = useNavigate();
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
  const [resultMsg, setResultMsg] = useState("");

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
        setResultMsg("Project updated successfully!");
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
      setTimeout(() => {
        navigate("/projects");
      }, 2000);

      setResultMsg("Project created successfully!");
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
          <label>Genres:</label>
          <SelectBox
            name="genres"
            id="genres"
            options={movieGenres.map((genre) => ({
              value: genre.toLowerCase(),
              label: genre,
            }))}
            onChange={(selectedGenre) =>
              setProject({ ...project, genres: selectedGenre })
            }
          />
        </div>
        <p>{resultMsg}</p>
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
