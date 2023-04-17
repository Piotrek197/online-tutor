import { Link } from "react-router-dom";
const CannotFindPage = () => {
  return (
    <section>
      <h1>Cannot find page</h1>
      <Link to="/">Go Home</Link>
    </section>
  );
};

export default CannotFindPage;
