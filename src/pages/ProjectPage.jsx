import { useParams } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { Link } from "react-router-dom";
// hooks
import useProject from "../hooks/use-project";

//pages
import "./projectPage.css";
// component
import InfoDetail from "../components/InfoDetail";
import Button from "../components/Button";
import PledgeProgress from "../components/PledgeProgress";

function ProjectPage() {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  // console.log(auth.user_id);
  // console.log(auth);
  console.log(id);

  // console.log(id);
  const { project, isLoading, error } = useProject(id);

  // console.log(project.pledges);

  const isOwner = project.owner == auth.user_id;
  const isOwnerOfPledge = project.supporter == auth.user_id;
  // console.log(isOwnerOfPledge);
  // console.log(auth.user_id);

  const pledgeLink = "/pledges";
  const projectUpdateLink = `/projects/${id}`;

  // console.log(project);
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="container">
      <div className="title-container">
        <h2>{project.title}</h2>
        <h2>By {project.director}</h2>
      </div>
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
        <div className="movie-detail">
          <InfoDetail label="genres" info={project.genres} />
          <InfoDetail label="Create date" info={project.date_created} />
          <h3>{`Status: ${project.is_open}`}</h3>
          <h3>movie synopsis</h3>
          <p>{project.movie_synopsis}</p>
          {isOwner ? (
            <Link to={projectUpdateLink}>
              <Button name="Edit" />
            </Link>
          ) : (
            ""
          )}g
        </div>
        <h3>Pledges:</h3>
        <ul>
          {project.pledges.map((pledgeData, key) => (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter}
              {pledgeData.supporter == auth.user_id ? (
                <Link to={`/pledge/${pledgeData.id}`}>
                  <Button name="Edit" />
                </Link>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProjectPage;
