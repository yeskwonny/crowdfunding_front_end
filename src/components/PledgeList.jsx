import { useState } from "react";
import { PiHandHeartBold } from "react-icons/pi";
import Button from "./Button";
import "./PledgeList.css";

function PledgeList({ pledges }) {
  const [isShowAll, setIsShowAll] = useState(false);

  //   checking pledges
  if (!pledges || pledges.length === 0) {
    return <p style={{ textAlign: "center" }}>No pledges yet.</p>;
  }
  const allPledges = isShowAll ? pledges : pledges.slice(0, 5);
  //change number format
  function changeNumFormat(num) {
    const newFormat = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return newFormat;
  }
  function changeNumFormat(num) {
    const newFormat = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return newFormat;
  }

  function handleOnClick() {
    if (isShowAll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    setIsShowAll(!isShowAll);
  }

  return (
    <div className="pledge-list">
      {allPledges.map((pledgeData, key) => (
        <div className="pledge-item-container" key={key}>
          <div className="pledge-item">
            <div className="pledge-name">
              <PiHandHeartBold />
              <span>Supporter: {pledgeData.username}</span>
            </div>
            <span>Amount: ${changeNumFormat(pledgeData.amount)}</span>
            <span>Comment: {pledgeData.comment}</span>
          </div>
        </div>
      ))}
      {pledges.length > 5 ? (
        <Button
          name={!isShowAll ? "Show all" : "Show less"}
          onClick={handleOnClick}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default PledgeList;
