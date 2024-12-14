import { useParams } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";

function NewPledge() {
  const { id } = useParams();

  return (
    <div>
      <PledgeForm id={id} />
    </div>
  );
}
export default NewPledge;
