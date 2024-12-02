import { useState } from "react";
import postPledge from "../api/post-pledges";
import { useParams } from "react-router-dom";

function NewPledge() {
  const { id } = useParams();
  console.log(id);
  const [pledge, setPledge] = useState({
    project: id,
    amount: "",
    comment: "",
    anonymous: "",
  });
  function handleChange(e) {
    const { id, value } = e.target;
    setPledge({ ...pledge, [id]: id === "amount" ? +value : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { project, amount, comment, anonymous } = pledge;

      const response = await postPledge(project, amount, comment, anonymous);
    } catch (error) {
      console.error("Error trying to create a pledge:", error.message);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
  return (
    <div>
      <form>
        <label htmlFor="amount">amount :</label>
        <input
          type="number"
          id="amount"
          onChange={handleChange}
          value={pledge.amount}
        ></input>

        <label htmlFor="comment">comment :</label>
        <input
          type="comment"
          id="comment"
          value={pledge.comment}
          onChange={handleChange}
        ></input>

        <label htmlFor="anonymous"> :</label>
        <input
          type="text"
          id="anonymous"
          onChange={handleChange}
          value={pledge.anonymous}
        ></input>

        <button type="submit" onClick={handleSubmit}>
          Sign up
        </button>
      </form>
    </div>
  );
}
export default NewPledge;
