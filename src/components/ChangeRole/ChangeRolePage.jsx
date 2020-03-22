import React from 'react';
import {getAllUsers} from '../../api';
import User from './User';

class ChangeRolePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      role: ''
    }
  }
 
  componentDidMount() {
    this.fetchAllUsers();
  }

  componentDidUpdate(prevState) {
    if (prevState.users !== this.state.users) {
      this.fetchAllUsers();
    }
  }

  fetchAllUsers() {
    getAllUsers()
      .then(res => this.setState({users: [...res.data]}))
      .catch(e => console.log(e));
  }

  render() {
    let allUsers;
    allUsers = this.state.users.map((user, index) => {
      return (
        <User 
          user={user.username} 
          role={user.role} 
          userId={user._id} 
          key={index}
        />
        );
    });

    return (
      <div>
        <h3>Change any user's role from just user to admin and vice versa!</h3>
        {allUsers}
      </div>
    );
  }

};

export default ChangeRolePage;