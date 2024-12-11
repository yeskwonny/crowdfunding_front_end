function InputField({ id, value, type, onChange, label, style }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      <label
        htmlFor={id}
        style={{
          flex: "0 0 120px",
          textAlign: "right",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        style={{
          flex: "1",
          ...style,
        }}
      />
    </div>
  );
}

export default InputField;
