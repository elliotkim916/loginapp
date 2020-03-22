import React, {useContext} from 'react';
import Auth from '../Auth/Auth';
import history from '../../history';
import AuthContext from '../../context/AuthContext';

const CreateUser = props => {
  const authContext = useContext(AuthContext);
  
  return (
    <React.Fragment>
      <Auth 
        header="Create new user" 
        button="Create" 
        login={authContext.registerNewUser} 
        setUsername={authContext.setUsername}
        setPassword={authContext.setPassword}
        history={history} 
      />
    </React.Fragment>
  );
};

export default CreateUser;