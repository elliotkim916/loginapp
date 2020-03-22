import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import LandingPage from './components/Landing/LandingPage';
import CreateUser from './components/CreateUser/CreateUser';
import LoginPage from './components/Login/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import ChangeRolePage from './components/ChangeRole/ChangeRolePage';
import AuthContext from './context/AuthContext';
import {registerUser, login, refreshAuthToken} from './api';
import {saveAuthToken} from './local-storage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userId: '',
      loggedIn: false
    }
  }
 
  componentDidUpdate(prevState) {
    if (!prevState.loggedIn && this.state.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevState.loggedIn && !this.state.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(() => 
      refreshAuthToken(), 
      60 * 60 * 1000
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
  
    clearInterval(this.refreshInterval);
  }

  registerNewUser = e => {
    const {username, password} = this.state;
    e.preventDefault();

    if (username === '' || password === '') {
      window.alert('Please enter both username and password..');
      return;
    }

    if (username.length < 7 || password.length < 7) {
      window.alert('Username or password is too short, must be at least 7 characters..');
      return;
    }

    registerUser(username.trim(), password.trim())
      .then(res => {
        if (res.status === 201) {
          this.setState({userId: res.data._id});

          login(username.trim(), password.trim())
            .then(res => {
              if (res.status === 200) {
                saveAuthToken(res.data.authToken);
                this.setLoggedIn();
                this.props.history.push('/dashboard');
              }
            })
            .catch(e => console.log(e));
        }
      })
      .catch(e => {
        console.log(e);
        window.alert('There was an error.');
      });
  }

  loginToAccount = e => {
    const {username, password} = this.state;
    e.preventDefault();
    
    login(username.trim(), password.trim())
      .then(res => {
        if (res.status === 200) {
          this.setState({userId: res.data._id, loggedIn: true});
          saveAuthToken(res.data.authToken);
          alert('Log in successful');
          this.props.history.push('/dashboard');
        } else {
          window.alert('Incorrect username or password.');
        }
      })
      .catch(e => {
        console.log(e);
        window.alert('Incorrect username or password.');
      });
  }

  setUsername = (username) => {
    this.setState({username});
  }

  setPassword = (password) => {
    this.setState({password});
  }
  
  setLoggedIn = () => {
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <div className="App">
        <h1>Login App</h1>
        <Router history={history}>
          <Switch>
            <AuthContext.Provider
              value={{
                username: this.state.username,
                userId: this.state.userId,
                loggedIn: this.state.loggedIn,
                setUsername: this.setUsername,
                setPassword: this.setPassword,
                setLoggedIn: this.setLoggedIn,
                registerNewUser: this.registerNewUser,
                loginToAccount: this.loginToAccount
              }}
            >
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/createUser" component={CreateUser} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/changeRole" component={ChangeRolePage} />
            </AuthContext.Provider>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
