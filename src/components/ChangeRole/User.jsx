import React, {useState} from 'react';
import {editUserById} from '../../api';
import './User.css';

const User = props => {
  const [changeRole, setChangeRole] = useState(false);
  const [role, setRole] = useState(false);

  const updateRole = (e, userId, userRole) => {
    e.preventDefault();
    
    editUserById(userId, userRole)
      .then(res => {
        if (res.status === 200) {
          window.alert('User role has been successfully updated!');
          setChangeRole(false);
        }
      })
      .catch(e => console.log(e));
  }

  let form;
  if (changeRole) {
    form = (
      <form 
        onSubmit={e => updateRole(e, props.userId, role)}
        className="updateForm"
      >
        <input 
          type="radio" 
          name="admin" 
          value="admin"
          id="admin" 
          checked={role === 'admin'}
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="admin">Admin</label>
        <input 
          type="radio" 
          name="user" 
          value="user" 
          id="user"
          checked={role === 'user'}
          onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="user">User</label><br/>
        <button type="submit" className="updateRoleButton spacing">Update User Role</button>
        <button type="button" onClick={() => setChangeRole(false)} className="updateRoleButton">Cancel</button>
      </form>
    );
  } else {
    form = null;
  }

  return (
    <div className="user">
      <p>Username: {props.user}</p>
      <p>Role: {props.role}</p>
      <button 
        type="button" 
        onClick={() => setChangeRole(true)}
        className="updateRoleButton"
      >
        Change Role
      </button>
      {form}
    </div>
  );
}

export default User;