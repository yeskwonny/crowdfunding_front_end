import { BiSolidCameraMovie } from "react-icons/bi";

function InputField({ id, value, type, onChange, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <BiSolidCameraMovie style={{ fontSize: "24px", color: "black" }} />
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
