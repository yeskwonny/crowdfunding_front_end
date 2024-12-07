import { useState, useEffect } from "react";
// api
import postPledge from "../api/post-pledges";
import { putPledge } from "../api/put-pledge";
// components
import InputField from "../components/InputField";
import Button from "./Button";

function PledgeForm({ id, pledgeData = {} }) {
  const [isEdit, setIsEdit] = useState(false);
  const [pledge, setPledge] = useState({
    project: id ? id : null,
    amount: "",
    comment: "",
    anonymous: "",
    ...pledgeData,
  });
  console.log(id);
  console.log(pledgeData);
  console.log(pledge);

  function handleChange(e) {
    const { id, value } = e.target;
    setPledge({ ...pledge, [id]: id === "amount" ? +value : value });
  }

  useEffect(() => {
    if (Object.keys(pledgeData).length > 0) {
      setIsEdit(true);
    }
  }, [pledgeData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { id, project, amount, comment, anonymous } = pledge;

      if (isEdit) {
        const response = await putPledge(
          id,
          project,
          amount,
          comment,
          anonymous
        );
        console.log("Pledge updated:", response);
      } else {
        const response = await postPledge(project, amount, comment, anonymous);
        console.log("Pledge created:", response);
      }
    } catch (error) {
      console.error(
        isEdit ? "Error updating the pledge:" : "Error creating the pledge:",
        error.message
      );
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
        name={isEdit ? "Edit" : "Create a Pledge"}
      ></Button>
    </form>
  );
}

export default PledgeForm;
