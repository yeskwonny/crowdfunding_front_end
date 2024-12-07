import { Link } from "react-router-dom";
import "./ProjectCard.css";
import PledgeProgress from "./PledgeProgress";
function ProjectCard({ projectData, baseURL }) {
  const projectLink = `/project/${projectData.id}`;
  console.log(projectData);
  const pledgeProgress = (projectData.pledge_total / projectData.goal) * 100;
  console.log(pledgeProgress);
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
        <h4>Title: {projectData.title}</h4>
        <h4>By {projectData.director}</h4>
      </div>
    </div>
  );
}

export default ProjectCard;
