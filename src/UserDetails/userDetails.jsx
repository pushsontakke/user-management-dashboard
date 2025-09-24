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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  // Apply filters function
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

  // Search function
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(e.target.value);

    if (term === "") {
      setFilteredUsers(users);
      return;
    }

    const searchedUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.company.name.toLowerCase().includes(term)
    );

    setFilteredUsers(searchedUsers);
  };

  // Sort function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      let aValue, bValue;

      if (key === "department") {
        aValue = a.company.name;
        bValue = b.company.name;
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sortedUsers);
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="user-table-container">
      <div className="table-header">
        <h2>User Details</h2>
        <button onClick={() => setShowModal(true)}>Add User</button>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users by name, email, or department..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="controls-buttons">
          <button
            onClick={() => setIsFilterPopupOpen(true)}
            className="filter-btn"
          >
            Filter
          </button>
          <button
            onClick={() => {
              setFilteredUsers(users);
              setSearchTerm("");
              setFilters({ name: "", email: "", department: "" });
            }}
            className="reset-btn"
          >
            Reset
          </button>
        </div>
      </div>

      <Filter
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={applyFilters}
      />

      {filteredUsers.length === 0 ? (
        <p className="no-data">No user data available</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")} className="sortable">
                ID{getSortIndicator("id")}
              </th>
              <th onClick={() => handleSort("name")} className="sortable">
                Full Name{getSortIndicator("name")}
              </th>
              <th onClick={() => handleSort("email")} className="sortable">
                Email{getSortIndicator("email")}
              </th>
              <th onClick={() => handleSort("department")} className="sortable">
                Department{getSortIndicator("department")}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <button
                    onClick={() => handleEditUserDetails(user)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Results count */}
      <div className="results-info">
        <p>
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

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
