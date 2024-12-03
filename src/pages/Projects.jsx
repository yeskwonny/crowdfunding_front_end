import useProjects from "../hooks/use-projects";
// componet
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

function Projects() {
  const { projects, isLoading, error } = useProjects();

  return (
    <div className="projects-container">
      {projects.map((projectData, key) => (
        <ProjectCard key={key} projectData={projectData} baseURL="project" />
      ))}
    </div>
  );
}

export default Projects;
