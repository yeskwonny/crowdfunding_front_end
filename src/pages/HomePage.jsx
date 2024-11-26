import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import AutoPlay from "../components/AutoPlay";
import Menu from "../components/Menu";
import "./HomePage.css";

function HomePage() {
  const { projects } = useProjects();

  console.log(projects);
  return (
    <div>
      <AutoPlay />
      <Menu />
      <h3 className="top-pick">Top Picks</h3>
      <div id="project-list">
        {projects.map((projectData, key) => {
          return <ProjectCard key={key} projectData={projectData} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
