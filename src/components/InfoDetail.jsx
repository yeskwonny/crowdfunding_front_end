function InfoDetail({ label, info, type }) {
  const typeStyles = {
    summary: { fontSize: "14px" },
    input: { fontSize: "16px", color: "#555", borderBottom: "1px solid #ddd" },
    list: { fontSize: "14px", color: "#777", lineHeight: "1.5" },
    
  };

  return (
    <div>
      <span style={typeStyles[type] || {}}>{label}:</span>
      <span style={typeStyles[type] || {}}>{info}</span>
    </div>
  );
}

export default InfoDetail;
