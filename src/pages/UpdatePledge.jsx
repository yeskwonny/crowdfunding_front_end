import { useParams } from "react-router-dom";
import usePledge from "../hooks/use-pledge";
import PledgeForm from "../components/PledgeForm";
import { useState } from "react";
import useAuth from "../hooks/use-auth";

function UpdatePledgePage() {
  const { id } = useParams();
  const { auth, setAuth } = useAuth;
  console.log(auth);
  const { pledge, isLoading, error } = usePledge(id);
  console.log(pledge);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>Edit Pledges</h1>
      <PledgeForm pledgeData={pledge} />
    </div>
  );
}

export default UpdatePledgePage;
