import useProjects from "../hooks/use-projects";
import { useLocation } from "react-router-dom";
// componet
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

function Projects() {
  const { projects, isLoading, error } = useProjects();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  // getting filtered array or get all projects

  const filteredProject = genre
    ? Array.isArray(projects) &&
      projects.filter(
        (project) => project.genres.toLowerCase() === genre.toLowerCase()
      )
    : projects;

  return (
    <div className="projects-container">
      {filteredProject.length > 0 ? (
        filteredProject.map((projectData, key) => (
          <ProjectCard key={key} projectData={projectData} baseURL="project" />
        ))
      ) : (
        <p>No result</p>
      )}
    </div>
  );
}

export default Projects;
