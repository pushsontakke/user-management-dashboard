import React, { useState } from "react";
import "./UserDetailsTable.css";
import Model from "../Modal/model";

const UserDetailsTable = ({
  users,
  formData,
  setFormData,
  handleAddUser,

}) => {
  const [showModel, setShowModal] = useState(false);

 

  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2>User Details</h2>
        <button onClick={() => setShowModal(true)}>Add User</button>
      </div>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <button >Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModel && (
        <Model
          formData={formData}
          setFormData={setFormData}
          setShowModal={setShowModal}
          handleAddUser={handleAddUser}
        />
      )}
    </div>
  );
};

export default UserDetailsTable;
