import "../components/PledgeProgress.css"

function PledgeProgress({ pledgeTotal, goal }) {
  const pledgeProgress = Math.min(Math.round((pledgeTotal / goal) * 100), 100);

  return (
    <div className="project-container">
      <div className="status-bar-container">
        <div
          className="status-bar"
          style={{ width: `${pledgeProgress}%` }}
        ></div>
        <span className="status-percentage">{pledgeProgress}%</span>
      </div>
    </div>
  );
}

export default PledgeProgress;
