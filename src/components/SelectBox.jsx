import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectBox({ options, onChange, name, id, option, value }) {
  console.log(value);
  const [resultMsg, setResultMsg] = useState("");
  async function handleChange(e) {
    const selectedValue = e.target.value;

    if (onChange) {
      const result = await onChange(selectedValue);
      if (result?.message) setResultMsg(result.message);
    }
  }

  return (
    <div className="select">
      <div>{resultMsg}</div>
      <select name={name} id={id} onChange={handleChange} value={value}>
        <option>{option}</option>
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
