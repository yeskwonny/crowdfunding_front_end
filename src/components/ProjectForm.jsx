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
  const [error, setError] = useState({});
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
  console.log(isEdit);
  function handleChange(e) {
    const { id, value } = e.target;
    setProject({ ...project, [id]: id === "goal" ? Number(value) : value });
  }
  console.log(error);
  function validateForm() {
    const validationMsg = {};
    if (!project.title) {
      validationMsg.title = "Title can not be empty";
    }
    if (!project.director) {
      validationMsg.director = "Comment can not be empty.";
    }

    if (!project.movie_synopsis) {
      validationMsg.movie_synopsis = "Movie synopsis can not be empty";
    }

    if (project.goal < 0 || !project.goal) {
      validationMsg.goal = "Target must be a positive number";
    }

    if (!project.goal_deadline) {
      validationMsg.goal_deadline = "Date can not be empty";
    }

    if (!project.genres) {
      validationMsg.genres = "Please select movie genere";
    }
    setError(validationMsg);
    // checking errmsg object is empty or not
    // sending true or false
    return Object.keys(validationMsg).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }
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
        // 업데이트 로직
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
      } else {
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
        setResultMsg("Project created successfully!");
      }

      // 성공 후 네비게이션
      setTimeout(() => {
        navigate("/projects");
      }, 2000);
    } catch (error) {
      console.error("Error trying to create/update a project:", error.message);
      setResultMsg(error.message || "An unexpected error occurred.");
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
          {error.title && <p>{error.title}</p>}
          <InputField
            id="director"
            value={project.director}
            type="text"
            onChange={handleChange}
            label="Director"
          />
        </div>

        {error.director && <p>{error.director}</p>}
        <div className="movie-detail">
          <InputField
            id="movie_synopsis"
            value={project.movie_synopsis}
            type="text"
            onChange={handleChange}
            label="Movie Synopsis"
          />
        </div>
        {error.movie_synopsis && <p>{error.movie_synopsis}</p>}
        <div className="movie-target">
          <InputField
            id="goal"
            value={project.goal}
            type="number"
            onChange={handleChange}
            label="Your target"
          />
          {error.goal && <p>{error.goal}</p>}
          <InputField
            id="goal_deadline"
            value={project.goal_deadline}
            type="date"
            onChange={handleChange}
            label="Target Date"
          />
          {error.goal_deadline && <p>{error.goal_deadline}</p>}
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
          {error.genres && <p>{error.genres}</p>}
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
