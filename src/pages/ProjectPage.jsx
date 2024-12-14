import { useParams } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// hooks
import useProject from "../hooks/use-project";
import deleteProject from "../api/delete-project";
//pages
import "./ProjectPage.css";
// component
import InfoDetail from "../components/InfoDetail";
import Button from "../components/Button";
import PledgeProgress from "../components/PledgeProgress";
import { BiGridSmall } from "react-icons/bi";
import SelectBox from "../components/SelectBox";
import { useState } from "react";

function ProjectPage() {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const { project, isLoading, error } = useProject(id);
  const isOwner = project.owner == auth.user_id;

  const options = [
    { value: "edit", label: "Edit Project" },
    { value: "delete", label: "Delete Project" },
  ];

  async function handleSelect(action) {
    if (action === "edit") {
      navigate(`/projects/${id}`);
    }

    if (action === "delete") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmed) {
        const result = await deleteProject(id);
        return { message: result.message };
      }
    }
  }

  function handlePledgeClick() {
    if (isOwner) {
      setErrorMsg("You cannot make a pledge for your own project.");
      return; // 오너인 경우 페이지 이동 차단
    }
    if (auth.token && !isOwner) {
      navigate(`/pledges/${id}`);
    } else {
      navigate("/login");
    }
  }

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
            <Button onClick={handlePledgeClick} name="Make a Pledge" />
          </div>
          {errorMsg && <p className="error-message">{errorMsg}</p>}
        </div>
      </div>
      <div className="section-container">
        {isOwner ? (
          <SelectBox
            options={options}
            option="Manage your project"
            onChange={handleSelect}
            name="projectActions"
            id="projectActions"
          />
        ) : (
          ""
        )}
        <div className="movie-detail">
          <div className="section-title">
            <h1>Movie</h1>
          </div>
          <InfoDetail label="Title" info={project.title} />
          <InfoDetail label="Director" info={project.director} />
          <InfoDetail label="Genres" info={project.genres} />
          <InfoDetail
            label="Create date"
            info={new Date(project.date_created).toLocaleDateString()}
          />
          <InfoDetail
            label="Status"
            info={project.is_open ? "Open" : "Closed"}
          />
          <div className="section-title">
            <h1>Story</h1>
          </div>
          <p>{project.movie_synopsis}</p>
        </div>
        <div className="pledge-container">
          <div className="section-title">
            <h1>Support</h1>
          </div>
          {project.pledges.map((pledgeData, key) => (
            <div className="pledge-item-container" key={key}>
              <div className="pledge-item">
                <h3>Username:{pledgeData.supporter}</h3>
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
