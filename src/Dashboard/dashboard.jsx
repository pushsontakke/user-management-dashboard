import React, { useState, useEffect, use } from "react";
import UserDetailsTable from "../UserDetails/userDetails";
import axios from "axios";
import "./dashboard.css";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
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
      console.log(" response: User added:", response);
      // setUsers([...users, response.data]);
      if (response.status === 201) {
        alert("User added successfully");
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      alert("Failed to add user", error.message);
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
        
      />
    </div>
  );
};

export default Dashboard;