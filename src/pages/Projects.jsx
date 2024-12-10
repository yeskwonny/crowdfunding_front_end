import useProjects from "../hooks/use-projects";
import { useLocation } from "react-router-dom";
// componet
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

function Projects() {
  const { projects, isLoading, error } = useProjects();
  console.log(projects);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // 쿼리 파라미터 읽기
  const genre = searchParams.get("genre");
  console.log(genre);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러 처리
  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  const filteredProject = genre
    ? Array.isArray(projects) &&
      projects.filter(
        (project) => project.genres.toLowerCase() === genre.toLowerCase()
      )
    : projects;
  console.log(filteredProject);
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
