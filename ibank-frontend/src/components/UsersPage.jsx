import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../assets/contexts/AuthContext";

import { API_ENDPOINT } from "../assets/configuration/config";

const UsersPage = () => {

  const { authUser } = useContext(AuthContext);

  const[ users, setUsers ] = useState([]);

  const fetchUsers = () => {
    axios({
      method: "get",
      url: `${API_ENDPOINT}/users`
    })
    .then(res => {
      setUsers(res.data);
    }) 
    .catch(err => {
       console.error('Error fetching users:', err);
    });
  }

  const handleRedirect = () => {
    if(authUser.role==="Teller"){}
  }



  useEffect(()=>{
    fetchUsers();
  },[])

  return (<div className="users-page">
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u,i)=>{
            return<tr key={i} onClick={()=>handleRedirect()}>
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