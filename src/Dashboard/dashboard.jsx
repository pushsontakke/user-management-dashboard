import React, { useState, useEffect } from "react";
import UserDetailsTable from "../UserDetails/userDetails";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editTrue, setEditTrue] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [editUser, setEditUser] = useState({
    id: null,
    name: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        return error.message;
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (formData) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );
      if (response.status === 201) {
        alert("User added successfully");
        // setUsers([...users, response.data]);
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      alert("Failed to add user", error.message);
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      if (response.status === 200) {
        alert(" response: user edited");
      }
    } catch (error) {
      console.error("Error editing user:", error.message);
      alert("Failed to edit user", error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (response.status === 200) {
        alert("User deleted successfully");
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserDetailsTable
        users={users}
        formData={formData}
        setFormData={setFormData}
        handleAddUser={handleAddUser}
        editUser={editUser}
        setEditUser={setEditUser}
        handleEditUser={handleEditUser}
        editTrue={editTrue}
        setEditTrue={setEditTrue}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default Dashboard;
