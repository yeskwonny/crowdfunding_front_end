import { useParams } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// hooks

import useProject from "../hooks/use-project";

//pages
import "./projectPage.css";
// component
import InfoDetail from "../components/InfoDetail";
import Button from "../components/Button";
import PledgeProgress from "../components/PledgeProgress";
import Dropdown from "../components/SelectBox";
import { BiGridSmall } from "react-icons/bi";
import SelectBox from "../components/SelectBox";
function ProjectPage() {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const navigator = useNavigate();
  console.log(id);

  // console.log(id);
  const { project, isLoading, error } = useProject(id);

  // console.log(project.pledges);

  const isOwner = project.owner == auth.user_id;
  const projectUpdateLink = `/projects/${id}`;

  function handleDelete() {
    deleteProject(id);
    navigator(-1);
  }

  // console.log(project);
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="container">
      <div className="main-container">
        <img src={project.image}></img>
        <div className="pledge-detail">
          <InfoDetail
            type="summary"
            label="Funding Goal"
            info={`$${project.goal}`}
          />

          <InfoDetail
            type="summary"
            label="Total Raised"
            info={`$${project.total_pledges}`}
          />
          <PledgeProgress
            pledgeTotal={project.total_pledges}
            goal={project.goal}
          />
          <InfoDetail
            type="summary"
            label="Deadline"
            info={new Date(project.goal_deadline).toLocaleDateString()}
          />
          <div className="button-container">
            <Link to={`/projects`}>
              <Button name="Back" />
            </Link>
            <Link to={`/pledges/${id}`}>
              <Button name="Make a Pledge" />
            </Link>
          </div>
        </div>
      </div>
      <div className="section-container">
        {isOwner ? (
          <SelectBox
            value1="Edit Project"
            value2="Delete Project"
            name="project"
            id="project"
            projectId={id}
          />
        ) : (
          ""
        )}
        <div className="movie-detail">
          <div className="section-title">
            <BiGridSmall className="section-icon" />
            <h1>Movie</h1>
          </div>
          <InfoDetail label="Title" info={project.title} />
          <InfoDetail label="Director" info={project.director} />
          <InfoDetail label="genres" info={project.genres} />
          <InfoDetail
            label="Create date"
            info={new Date(project.date_created).toLocaleDateString()}
          />
          <InfoDetail
            label="Status"
            info={project.is_open ? "Open" : "Closed"}
          />
          <div className="section-title">
            <BiGridSmall className="section-icon" />
            <h1>Story</h1>
          </div>
          <p>{project.movie_synopsis}</p>
        </div>
        <div className="pledge-container">
          <div className="section-title">
            <BiGridSmall className="section-icon" />
            <h1>Support</h1>
          </div>
          {project.pledges.map((pledgeData, key) => (
            <div className="pledge-item-container" key={key}>
              <div className="pledge-item">
                <h3>User name:{pledgeData.supporter}</h3>
                <h4>Amount:${pledgeData.amount}</h4>
                <h4>Comment:{pledgeData.comment}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
