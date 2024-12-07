import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import ProjectForm from "../components/ProjectForm";

function UpdateProjectPage() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>Edit Project</h1>
      <ProjectForm projectData={project} id={id} />
    </div>
  );
}

export default UpdateProjectPage;
