import { Link } from "react-router-dom";
// compoents
import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/use-projects";
import AutoPlay from "../components/AutoPlay";
import Menu from "../components/Menu";
import "./HomePage.css";

function HomePage() {
  // get all projects
  const { projects } = useProjects();

  // getting top3 pledge total projects
  const sortedProjects = projects.sort(
    (a, b) => b.pledge_total - a.pledge_total
  );
  const topThreeProjects = sortedProjects.slice(0, 3);

  return (
    <div>
      <AutoPlay />
      <Menu />
      <div className="top-pick-container">
        <h3 className="top-pick">Top Picks</h3>
        <Link to="/projects">
          <h3 className="view-all">View all</h3>
        </Link>
      </div>
      <div id="project-list">
        {topThreeProjects.map((projectData, key) => {
          return (
            <ProjectCard
              key={key}
              projectData={projectData}
              baseURL="project"
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
