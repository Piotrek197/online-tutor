// import { useState } from "react";
import { EmployeeType } from "./Admin";

// type UserType = {
//   username: string;
//   password: string;
//   accessToken: string;
// };

type PropsType = {
  employees: EmployeeType[] | null;
};

const Users = ({ employees }: PropsType) => {
  // const [users, setUsers] = useState<EmployeeType[] | null>(null);

  console.log("users", employees);

  return (
    <section>
      <h1>employees</h1>
      {employees?.length ? (
        employees?.map((user, index) => (
          <li key={index}>
            {user?.firstname} {user?.lastname}
          </li>
        ))
      ) : (
        <p>No employees to show</p>
      )}
    </section>
  );
};

export default Users;
