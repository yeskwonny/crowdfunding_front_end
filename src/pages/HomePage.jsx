import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import AutoPlay from "../components/AutoPlay";
import "./HomePage.css";

function HomePage() {
  const { projects } = useProjects();
  // console.log(projects);
  return (
    <div>
      <AutoPlay />
      <div id="project-list">
        {projects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
