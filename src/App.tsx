import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import LinkPage from "./LinkPage";
import Unauthorized from "./Unauthorized";
import Home from "./Home";
import Admin from "./Admin";
import CannotFindPage from "./CannotFindPage";
import RequireAuth from "./RequireAuth";
import TutorsList from "./TutorsList";
import PersistLogin from "./PersistLogin";
import TutorPage from "./TutorPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* public routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/linkpage" element={<LinkPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/tutorslist" element={<TutorsList />} />
          <Route path="/tutor" element={<TutorPage />} />

          {/*private routes*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[100, 200, 300]} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[300]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
          {/*catch call*/}
          <Route path="/*" element={<CannotFindPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
