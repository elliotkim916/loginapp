import React from 'react';
import './LandingPage.css';

const LandingPage = props => {
  return (
    <div>
      <h1>To begin, click on one of the following buttons below!</h1>

      <button 
        type="button" 
        onClick={() => props.history.push('/createUser')} 
        className="landingPageBtn"
      >
        Create New User
      </button>
      <button 
        type="button" 
        onClick={() => props.history.push('/login')} 
        className="landingPageBtn"
      >
        Login
      </button>
    </div>
  );
}

export default LandingPage;