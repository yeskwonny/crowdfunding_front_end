import { Link } from "react-router-dom";
import "./ProjectCard.css";
function ProjectCard({ projectData, baseURL }) {
  // console.log(baseURL);
  const projectLink = `/project/${projectData.id}`;
  console.log(projectData);
  const pledgeProgress = (
    (projectData.pledge_total / projectData.goal) *
    100
  ).toFixed(2);
  console.log(pledgeProgress);
  return (
    <div className="project-card">
      <Link to={projectLink}>
        <img src={projectData.image} />
        <h3>{projectData.title}</h3>
      </Link>
    </div>
  );
}

export default ProjectCard;
