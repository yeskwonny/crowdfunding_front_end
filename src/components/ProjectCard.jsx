import { Link } from "react-router-dom";
import "./ProjectCard.css";
import PledgeProgress from "./PledgeProgress";
function ProjectCard({ projectData, baseURL }) {
  const projectLink = `/project/${projectData.id}`;
  return (
    <div className="project-card">
      <Link to={projectLink}>
        <img src={projectData.image} />
      </Link>
      <PledgeProgress
        pledgeTotal={projectData.pledge_total}
        goal={projectData.goal}
      />
      <div className="project-title">
        <h4>{projectData.title}</h4>
        <h4>{projectData.director}</h4>
      </div>
    </div>
  );
}

export default ProjectCard;
