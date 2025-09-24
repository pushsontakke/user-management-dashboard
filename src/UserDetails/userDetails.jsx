import React, { useState, useEffect } from "react";
import "./UserDetailsTable.css";
import Model from "../Modal/model";
import Filter from "../Filter/filter";

const UserDetailsTable = ({
  users,
  formData,
  setFormData,
  handleAddUser,
  setEditUser,
  handleEditUser,
  editTrue,
  setEditTrue,
  handleDeleteUser,
}) => {
  const [showModel, setShowModal] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [filteredUsers, setFilteredUsers] = useState(users);

  // Update filteredUsers when users prop changes
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleEditUserDetails = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.company.name,
    });
    setShowModal(true);
    setEditTrue(true);
  };

  const applyFilters = (appliedFilters) => {
    if (
      !appliedFilters.name &&
      !appliedFilters.email &&
      !appliedFilters.department
    ) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const nameMatch = appliedFilters.name
        ? user.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
        : true;

      const emailMatch = appliedFilters.email
        ? user.email.toLowerCase().includes(appliedFilters.email.toLowerCase())
        : true;

      const departmentMatch = appliedFilters.department
        ? user.company?.name
            ?.toLowerCase()
            .includes(appliedFilters.department.toLowerCase())
        : true;

      return nameMatch && emailMatch && departmentMatch;
    });

    setFilteredUsers(filtered);
  };

  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2>User Details</h2>
        <button onClick={() => setShowModal(true)}>Add User</button>
      </div>
      <button onClick={() => setIsFilterPopupOpen(true)}>Filter Users</button>
      <Filter
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
      />
      {filteredUsers.length === 0 ? ( // Changed from users to filteredUsers
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
            {filteredUsers.map(
              (
                user // Changed from users to filteredUsers
              ) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <button onClick={() => handleEditUserDetails(user)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {showModel && (
        <Model
          formData={formData}
          setFormData={setFormData}
          setShowModal={setShowModal}
          handleAddUser={handleAddUser}
          editTrue={editTrue}
          setEditUser={setEditUser}
          handleEditUser={handleEditUser}
        />
      )}
    </div>
  );
};

export default UserDetailsTable;
