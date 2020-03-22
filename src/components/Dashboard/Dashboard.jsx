import React from 'react';
import AuthContext from '../../context/AuthContext';
import {getAllUsers} from '../../api';
import {clearAuthToken} from '../../local-storage';
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    if (!this.context.loggedIn) {
      this.props.history.push('/');
    }

    getAllUsers()
      .then(res => this.setState({users: [...res.data]}))
      .catch(e => console.log(e));
  }

  logOut() {
    clearAuthToken();
    this.props.history.push('/');
  }

  render() {
    const currentUser = this.state.users.find(user => user._id === this.context.userId);
    
    if (currentUser) {
      let adminCheckbox, userCheckbox, changeRoleButton;
      if (currentUser.role === 'admin') {
        adminCheckbox = <input type="checkbox" name="adminCheck" className="adminCheck" id="adminCheck" />;
        userCheckbox = <input type="checkbox" name="userCheck" className="userCheck" disabled={true} />;
        changeRoleButton = <button type="button" className="changeRoleButton" onClick={() => this.props.history.push('/changeRole')}>Change Role of Users</button>
      } else {
        adminCheckbox = <input type="checkbox" name="adminCheck" className="adminCheck" disabled={true} />;
        userCheckbox = <input type="checkbox" name="userCheck" className="userCheck" id="userCheck" />;
        changeRoleButton = null;
      }

      return (
        <div>
          <h1>Welcome User {currentUser.username}!</h1>
          
          <label htmlFor="adminCheck" className="adminCheckLabel">Check here if you are an admin user!</label>
          {adminCheckbox}<br/><br/>
  
          <label htmlFor="userCheck" className="userCheckLabel">Check here if you are just a user and not an admin user!</label>
          {userCheckbox}<br/><br/>

          {changeRoleButton}
          <button type="button" className="logoutButton" onClick={() => this.logOut()}>Log Out</button>
        </div>
      );
    } else {
      return null;
    }
  
  }
};

export default Dashboard;