import { useState } from "react";
// api
import postPledge from "../api/post-pledges";
// components
import InputField from "../components/InputField";
import Button from "./Button";
function PledgeForm({ id }) {
  const [pledge, setPledge] = useState({
    project: id ? id : null,
    amount: "",
    comment: "",
    anonymous: "",
  });
  console.log(id);
  console.log(pledge);
  function handleChange(e) {
    const { id, value } = e.target;
    setPledge({ ...pledge, [id]: id === "amount" ? +value : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { project, amount, comment, anonymous } = pledge;

      const response = await postPledge(project, amount, comment, anonymous);
      console.log(response);
    } catch (error) {
      console.error("Error trying to create a pledge:", error.message);
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }

  return (
    <form>
      <InputField
        type="number"
        id="amount"
        onChange={handleChange}
        value={pledge.amount}
        label="amount"
      />
      <InputField
        type="text"
        id="comment"
        onChange={handleChange}
        value={pledge.comment}
        label="comment"
      />
      <InputField
        type="text"
        id="anonymous"
        onChange={handleChange}
        value={pledge.anonymous}
        label="anonymous"
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        name="Create a pledge"
      ></Button>
    </form>
  );
}

export default PledgeForm;
