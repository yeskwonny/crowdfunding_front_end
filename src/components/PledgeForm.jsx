import { useState, useEffect } from "react";
// api
import postPledge from "../api/post-pledges";
import { putPledge } from "../api/put-pledge";
// components
import InputField from "../components/InputField";
import Button from "./Button";
import SelectBox from "./SelectBox";

const options = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

function PledgeForm({ id, pledgeData = {} }) {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({});
  const [resultMsg, setResultMsg] = useState("");
  const [pledge, setPledge] = useState({
    project: id ? id : null,
    amount: "",
    comment: "",
    anonymous: "",
    ...pledgeData,
  });

  useEffect(() => {
    if (Object.keys(pledgeData).length > 0) {
      setIsEdit(true);
    }
  }, [pledgeData]);

  function handleChange(e) {
    const { id, value } = e.target;
    setPledge({ ...pledge, [id]: id === "amount" ? +value : value });
    if (error[id]) {
      setError((prev) => {
        const updatedError = { ...prev };
        delete updatedError[id];
        return updatedError;
      });
    }
  }

  function validateForm() {
    const validationMsg = {};
    if (pledge.amount < 0 || !pledge.amount) {
      validationMsg.amount = "Amount must be a positive number";
    }
    if (!pledge.comment) {
      validationMsg.comment = "Comment cannot be empty.";
    }
    if (pledge.anonymous !== "true" && pledge.anonymous !== "false") {
      validationMsg.anonymous = 'Anonymous must be "true" or "false".';
    }
    setError(validationMsg);
    // checking errmsg object is empty or not
    // sending true or false
    return Object.keys(validationMsg).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }
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
      }
    } catch (error) {
      console.error(
        isEdit ? "Error updating the pledge:" : "Error creating the pledge:",
        error.message
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="number"
        id="amount"
        onChange={handleChange}
        value={pledge.amount}
        label="amount"
      />
      {error.amount && <p className="error-message">{error.amount}</p>}
      <InputField
        type="text"
        id="comment"
        onChange={handleChange}
        value={pledge.comment}
        label="comment"
      />
      {error.comment && <p className="error-message">{error.comment}</p>}
      <SelectBox
        options={options}
        onChange={(selectedValue) =>
          setPledge({ ...pledge, anonymous: selectedValue })
        }
      />
      {error.anonymous && <p className="error-message">{error.anonymous}</p>}

      <Button type="submit" name={isEdit ? "Edit" : "Create a Pledge"}></Button>
      {}
    </form>
  );
}

export default PledgeForm;
