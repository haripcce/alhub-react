import api from "../api";
import { userLoggedIn, userFetched } from "./auth";

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

  export const fetchCurrentUser = () => (dispatch) => 
	api.user.fetchCurrentUser().then((user) => dispatch(userFetched({...user,loaded:true})));
  