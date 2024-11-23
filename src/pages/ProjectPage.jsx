import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";

function ProjectPage() {
  const { id } = useParams();
  // console.log(id);
  const { project, isLoading, error } = useProject(id);
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
    </div>
  );
}

export default ProjectPage;
