import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const n = useNavigate();
  const goBack = () => n(-1);
  return (
    <section>
      <h1>Unauthorized</h1>
      <p>You don't have permissions to go to this page</p>
      <button onClick={goBack}>Go back</button>
    </section>
  );
};

export default Unauthorized;
