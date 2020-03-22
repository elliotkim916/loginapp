import React from 'react';

const authContext = React.createContext({
  username: '',
  userId: '',
  loggedIn: false,
  setUsername: () => {},
  setPasword: () => {},
  setLoggedIn: () => {},
  registerNewUser: () => {},
  loginToAccount: () => {}
});

export default authContext;