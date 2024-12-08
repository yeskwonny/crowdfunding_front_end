import { useNavigate } from "react-router-dom";
import deleteProject from "../api/delete-project";
import "./SelectBox.css";
import { useState } from "react";

function SelectBox({ value1, value2, name, id, projectId }) {
  const navigate = useNavigate();
  const [resultMsg, setResultMsg] = useState("");

  async function handleChange(e) {
    const selectedValue = e.target.value;

    if (selectedValue === "Edit Project") {
      navigate(`/projects/${projectId}`);
    }

    if (selectedValue === "Delete Project") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
      );
      if (confirmed) {
        const result = await deleteProject(projectId);
        setResultMsg(result.message);
        setTimeout(() => navigate("/projects"), 2000);
      }
    }
  }
  return (
    <div className="select">
      <div>{resultMsg}</div>
      <select name={name} id={id} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value1={value1}>{value1}</option>
        <option value2={value2}>{value2}</option>
      </select>
    </div>
  );
}

export default SelectBox;
