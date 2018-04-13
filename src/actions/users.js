import api from "../api";
import {  userFetched } from "./auth";
import { CREATE_USER_REQUEST, CREATE_USER_FAILURE } from './../types';


  export const createUserRequest = user => ({
    type: CREATE_USER_REQUEST,
    user
  });
  export const createUserFailure = errors => ({
    type: CREATE_USER_FAILURE,
    errors
  });
  

  export const fetchCurrentUser = () => (dispatch) => 
	api.user.fetchCurrentUser().then((user) => dispatch(userFetched({...user,loaded:true})));
  