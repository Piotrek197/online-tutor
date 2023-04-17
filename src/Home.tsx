import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      <p>Welcome to home page!</p>
      <Link to="/linkpage">Link Page</Link>
      <Link to="/tutorslist">Tutors List</Link>
    </section>
  );
};

export default Home;
