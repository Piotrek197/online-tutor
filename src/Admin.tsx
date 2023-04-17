import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Users from "./Users";
import useAxiosPrivate from "./hooks/useAxiosPrivate";

export type EmployeeType = {
  firstname: string;
  lastname: string;
};

const Admin = () => {
  const axiosPrivate = useAxiosPrivate();
  const URL = "http://localhost:3500/employees";

  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    // const controller = new AbortController();
    let isMounted = true;

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get<EmployeeType[]>(URL);
        console.log(response.data);
        const data = response.data;
        if (isMounted) setEmployees(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getEmployees();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  return (
    <section>
      <h1>Admin</h1>
      <Users employees={employees} />
      <Link to="/linkpage">Link Page</Link>
    </section>
  );
};

export default Admin;
