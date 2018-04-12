import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import decode from 'jwt-decode';
import { USER_FETCHED } from './../types';


export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);

    const payload = decode(localStorage.bookwormJWT)
    const userData = {...user, confirmed:payload.confirmed,loaded:true };
  
    dispatch(userLoggedIn(userData));
  });
export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
  });

export const logout = () => dispatch => {
    localStorage.removeItem("bookwormJWT");
    setAuthorizationHeader();
    dispatch(userLoggedOut({loaded:true}));
  };
export const userLoggedOut = (user) => ({
    type: USER_LOGGED_OUT,
    user
  });

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);

export const userFetched = (user) => ({
	type : 	USER_FETCHED,
	user 
	});