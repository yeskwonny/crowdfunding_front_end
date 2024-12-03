function InputField({ id, value, type, onChange, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={onChange} value={value}></input>
    </div>
  );
}

export default InputField;
