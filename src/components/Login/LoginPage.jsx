import React, {useContext} from 'react';
import Auth from '../Auth/Auth';
import history from '../../history';
import AuthContext from '../../context/AuthContext';

const LoginPage = props => {
  const authContext = useContext(AuthContext);
  
  return (
    <React.Fragment>
      <Auth 
        header="Log In" 
        button="Log In" 
        login={authContext.loginToAccount}
        setUsername={authContext.setUsername}
        setPassword={authContext.setPassword}
        history={history}
      />
    </React.Fragment>
  );
};

export default LoginPage;
