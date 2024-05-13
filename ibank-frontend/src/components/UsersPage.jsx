import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import Masonry from 'react-masonry-css';

import EditUserModal from "./modals/EditUserModal";
import { API_ENDPOINT } from "../assets/configuration/config";

const UsersPage = () => {

  const[ users, setUsers ] = useState([]);

  const fetchUsers = () => {
    axios({
        method: "get",
        url: `${API_ENDPOINT}/users`
      })
      .then(res => {
        setUsers(res.data)
      }) 
      .catch(err => {
            console.error('Error fetching users:', err);
      });
}

  useEffect(()=>{
    fetchUsers();
  },[])

  return (<div className="users-page">
    <div className="container">
      <table className="table">
        <thead>
          <th>User ID</th>
          <th>Name</th>
          <th>Birthdate</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
        </thead>
        <tbody>
          {users.map((u,i)=>{
            return<tr key={i}>
              <td>{u.userId}</td>
              <td>{u.name}</td>
              <td>{u.birthdate}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>)
}

export default UsersPage;