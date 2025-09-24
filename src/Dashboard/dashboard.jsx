import React, { useState, useEffect } from 'react';
import UserDetailsTable from '../UserDetails/userDetails'
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {

    const [users, setUsers] = useState([]);

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
    }, [])

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserDetailsTable users={users} />
    </div>
  );
}

export default Dashboard