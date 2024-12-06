import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import useAuth from "../hooks/use-auth";
import { Link } from "react-router-dom";

function ProjectPage() {
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
  console.log(auth.user_id);

  // console.log(id);
  const { project, isLoading, error } = useProject(id);

  const isOwner = project.owner == auth.user_id;

  const pledgeLink = `/pledges/${id}`;
  const projectUpdateLink = `/projects/${id}`;

  // console.log(project);
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => (
          <li key={key}>
            {pledgeData.amount} from {pledgeData.supporter}
          </li>
        ))}
      </ul>
      <Link to={pledgeLink}>
        <button>pledge</button>
      </Link>

      {isOwner ? (
        <Link to={projectUpdateLink}>
          <button>update</button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProjectPage;
