import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectBox.css";

function SelectBox({ options, onChange, name, id }) {
  const navigate = useNavigate();
  const [resultMsg, setResultMsg] = useState("");

  async function handleChange(e) {
    const selectedValue = e.target.value;

    if (onChange) {
      const result = await onChange(selectedValue);
      if (result?.message) setResultMsg(result.message);
      setTimeout(() => {
        navigate(-1); // 브라우저 이전 페이지로 이동
      }, 2000);
    }
  }

  return (
    <div className="select">
      <div>{resultMsg}</div>
      <select name={name} id={id} onChange={handleChange}>
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
