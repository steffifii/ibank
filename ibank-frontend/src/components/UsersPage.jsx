import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import TransactionsModal from "./modals/TransactionsModal";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal"

import { AuthContext } from "../assets/contexts/AuthContext";
import { API_ENDPOINT } from "../assets/configuration/config";

const UsersPage = () => {

  const { authUser } = useContext(AuthContext);

  const [ selectedUser, setSelectedUser ] = useState({});
  const [ users, setUsers ] = useState([]);
  const [ isTransactionsPage, setIsTransactionsPage ] = useState(false);
  const [ isEditUserMode, setIsEditUserMode ] = useState(false);
  const [ isNewUserMode, setIsNewUserMode ] = useState(false);

  const fetchUsers = () => {
    axios({
      method: "get",
      url: `${API_ENDPOINT}/users`
    })
    .then(res => {
      if(authUser.role==="Teller"){
        let data = res.data.filter(item=>item.role==="Customer");
        setUsers(data);
      } else if(authUser.role==="Admin"){
        let data = res.data.filter(item=>item.role==="Customer" || item.role==="Teller");
        setUsers(data);
      }
    }) 
    .catch(err => {
       console.error('Error fetching users:', err);
    });
  }

  const handleRedirect = user => {
    setSelectedUser(user);

    if(authUser.role==="Teller"){
      setIsTransactionsPage(true);
    } else if(authUser.role==="Admin"){
      setIsEditUserMode(true);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  return (<div className="users-page">
    <div className="container">
      <div className="text-center mt-4">
      <h1>Users</h1>
        { authUser.role==="Admin" && <button className="btn btn-success text-white" onClick={()=>setIsNewUserMode(true)}>+ New User</button> }
      </div>
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
          { users.map((u,i)=>{
            return<tr className="user-row" key={i} onClick={()=>handleRedirect(u)}>
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
    { isTransactionsPage && <TransactionsModal isTransactionsPage={isTransactionsPage} setIsTransactionsPage={setIsTransactionsPage} user={selectedUser}/>}
    { isEditUserMode && <EditUserModal isEditUserMode={isEditUserMode} setIsEditUserMode={setIsEditUserMode} user={selectedUser} API_ENDPOINT={API_ENDPOINT}/>}
    { isNewUserMode && <CreateUserModal isNewUserMode={isNewUserMode} setIsNewUserMode={setIsNewUserMode} API_ENDPOINT={API_ENDPOINT}/>}
  </div>)
}

export default UsersPage;