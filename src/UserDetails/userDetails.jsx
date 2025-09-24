import React from "react";
import "./UserDetailsTable.css";

const UserDetailsTable = ({ users }) => {
  return (
    <div className="user-table-container">
      <h2>User Details</h2>
      {users.length === 0 ? (
        <p className="no-data">No user data available</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDetailsTable;
