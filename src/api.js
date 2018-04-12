import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/login",  credentials ).then(res => res.data.user),
    signup: user =>
      axios.post("/users/sign-up", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/users/confirm", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/users/reset_password_request", { email }),
    validateToken: token => axios.post("/users/validate_token", { token }),
    resetPassword: data => axios.post("/users/reset_password", { data })
  }
};
