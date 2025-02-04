import { useState, useEffect } from "react";
import { postCreateProject } from "../api/post-project";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../api/put-project";
import InputField from "./InputField";
import Button from "./Button";
import SelectBox from "./SelectBox";
import { movieGenres } from "../data";
import useAuth from "../hooks/use-auth";
import "./ProjectForm.css";

function ProjectForm({ projectData = {}, id }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({});
  const { auth, setAuth } = useAuth();
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

  // change date format for input field
  function formatDateForInput(date) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // checking getting updated data or not
  // object keys in array
  useEffect(() => {
    if (Object.keys(projectData).length > 0) {
      setProject({
        ...projectData,
        goal_deadline: formatDateForInput(projectData.goal_deadline),
      });
      setIsEdit(true);
    }
  }, [projectData]);

  function handleChange(e) {
    const { id, value } = e.target;
    setProject({ ...project, [id]: id === "goal" ? Number(value) : value });
    // clear error msg when input is not empty
    // getting id from e.target
    if (error[id]) {
      setError((prev) => {
        const updatedError = { ...prev };
        delete updatedError[id];
        return updatedError;
      });
    }
  }

  console.log(projectData);
  // validation
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

  //handle submit form
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

        setResultMsg(response.message || "Project updated successfully!");
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

      // moves to project page
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    } catch (error) {
      console.error("Error trying to create/update a project:", error.message);
      setResultMsg(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <div>
      <form className="project-form">
        <div className="movie-basic">
          <div className="instruction">
            <h3>Project info</h3>
            <p>
              Write a clear, brief title and subtitle to help people quickly
              understand your project. Your title should convey the essence of
              your project, while the subtitle provides additional context. Both
              will appear prominently on your project and pre-launch pages,
              ensuring potential supporters can grasp your idea instantly.
            </p>
          </div>
          <div className="movie-title">
            <InputField
              id="title"
              value={project.title}
              type="text"
              onChange={handleChange}
              label="Title"
            />
            {error.title && <p className="error-msg">{error.title}</p>}
            <InputField
              id="director"
              value={project.director}
              type="text"
              onChange={handleChange}
              label="Director"
            />

            {error.director && <p className="error-msg">{error.director}</p>}
            <div className="select-container">
              <SelectBox
                name="genres"
                id="genres"
                value={project.genres}
                options={movieGenres.map((genre) => ({
                  value: genre.toLowerCase(),
                  label: genre,
                }))}
                option="Select a genre"
                onChange={(selectedGenre) =>
                  setProject({ ...project, genres: selectedGenre })
                }
              />
            </div>
            {error.genres && <p className="error-msg">{error.genres}</p>}
          </div>
        </div>
        <div className="movie-synopsis">
          <div className="instruction">
            <h3>Movie Synopsis</h3>
            <p>
              Provide a brief summary of your movie's story. The synopsis should
              highlight the main plot, key characters, and tone of the movie to
              capture interest. Keep it concise and engaging for potential
              supporters.
            </p>
          </div>

          <div className="movie-synopsis-text">
            <textarea
              id="movie_synopsis"
              value={project.movie_synopsis}
              onChange={handleChange}
            />
            {error.movie_synopsis && (
              <p className="error-msg">{error.movie_synopsis}</p>
            )}
          </div>
        </div>

        <div className="movie-targets">
          <div className="instruction">
            <h3>Funding Goal and Deadline</h3>
            <p>
              Set a realistic funding goal for your project and choose a
              deadline for your campaign. Your goal should reflect the minimum
              amount you need to successfully produce your movie. Deadlines
              create urgency and motivate backers to contribute on time.
            </p>
          </div>

          <div className="movie-target">
            <InputField
              id="goal"
              value={project.goal}
              type="number"
              onChange={handleChange}
              label="Your target"
            />
            {error.goal && <p className="error-msg">{error.goal}</p>}
            <InputField
              id="goal_deadline"
              value={project.goal_deadline}
              type="date"
              onChange={handleChange}
              label="Target Date"
            />
            {error.goal_deadline && (
              <p className="error-msg">{error.goal_deadline}</p>
            )}
          </div>
        </div>

        <div className="movie-image">
          <div className="instruction">
            <h3>Project Image</h3>
            <p>
              Upload an eye-catching image that visually represents your movie.
              The image will appear on your project's main page and campaign
              listings. Make sure to use a high-quality image (JPEG or PNG) with
              a recommended resolution of 1920x1080 pixels.
            </p>
          </div>
          <div className="movie-image-input">
            <InputField
              id="image"
              value={project.image}
              type="text"
              onChange={handleChange}
              label="Image URL"
            />
          </div>
        </div>

        <p
          className={
            resultMsg.includes("failed") ? "error-message" : "success-message"
          }
        >
          {resultMsg}
        </p>
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
