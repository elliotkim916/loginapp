import React, {useEffect, useRef} from 'react';
import './Auth.css';

const Auth = props => {
  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <div>
      <h3>{props.header}</h3>
      <form onSubmit={e => props.login(e)}>
        <input 
          type="text" 
          className="formInput" 
          placeholder="Enter Username" 
          onChange={e => props.setUsername(e.target.value)} 
          ref={inputFocus}
        /><br/>
        <input 
          type="password" 
          className="formInput" 
          placeholder="Enter Password" 
          onChange={e => props.setPassword(e.target.value)} 
        /><br/>
        <button 
          type="submit" 
          className="submitButton"
        >
          {props.button}
        </button>
      </form>
    </div>
  );
};

export default Auth;