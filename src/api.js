import {
  REGISTER_USER_API_URL, 
  LOGIN_API_URL, 
  JWT_REFRESH_API_URL,
  GET_ALL_USERS_API_URL,
  GET_USER_BY_ID_API_URL,
  EDIT_USER_BY_ID_API_URL
} from './config';
import {loadAuthToken, saveAuthToken} from './local-storage';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
};
const authToken = loadAuthToken();

export const registerUser = (username, password) => {
  return axios.post(`${REGISTER_USER_API_URL}`, {
    username, 
    password
  }, config)
};

export const login = (username, password) => {
  return axios.post(`${LOGIN_API_URL}`, {
    username, 
    password
  }, config);
};

export const refreshAuthToken = () => {
  config.headers['Authorization'] = `Bearer ${authToken}`;
  axios.post(`${JWT_REFRESH_API_URL}`, null, config)
    .then(res => {
      const {authToken} = res.data;
      saveAuthToken(authToken);
    });
};

export const getAllUsers = () => {
  config.headers['Authorization'] = `Bearer ${authToken}`;
  return axios.get(`${GET_ALL_USERS_API_URL}`, config);
};

export const getUserById = id => {
  config.headers['Authorization'] = `Bearer ${authToken}`;
  return axios.get(`${GET_USER_BY_ID_API_URL}${id}`, config);
};

export const editUserById = (id, role) => {
  config.headers['Authorization'] = `Bearer ${authToken}`;
  return axios.post(`${EDIT_USER_BY_ID_API_URL}${id}`, 
    {role: role}, 
    config
  );
};
