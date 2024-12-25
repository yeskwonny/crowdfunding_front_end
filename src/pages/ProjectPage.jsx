// 필요 라이브러리 및 커스텀 훅 불러오기
import { useNavigate, useParams, Link } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import useProject from "../hooks/use-project";
import deleteProject from "../api/delete-project";
// CSS
import "./ProjectPage.css";
// 컴포넌트
import InfoDetail from "../components/InfoDetail";
import Button from "../components/Button";
import PledgeProgress from "../components/PledgeProgress";
import SelectBox from "../components/SelectBox";
import { useState } from "react";
import PledgeList from "../components/PledgeList";

function ProjectPage() {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  const { project, isLoading, error } = useProject(id);
  const isOwner = String(project.owner) === String(auth.user_id);

  console.log(isOwner);
  console.log(auth);
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
      return;
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
      <main className="main-container">
        <section className="movie-info-container">
          <img
            src={project.image}
            alt={project.title}
            className="movie-poster"
          />

          <div className="movie-detail">
            <div className="selectbox">
              {isOwner && (
                <SelectBox
                  options={options}
                  option="Manage your project"
                  onChange={handleSelect}
                  name="projectActions"
                  id="projectActions"
                />
              )}
            </div>
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
        </section>

        <aside className="pledge-side-bar">
          <div className="pledge-container">
            <div className="pledge-detail">
              <p>${project.total_pledges} raised</p>
              <p>${project.goal} target</p>

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

            <PledgeList pledges={project.pledges} />
          </div>
        </aside>
      </main>
    </div>
  );
}

export default ProjectPage;
