import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
//import decode from "jwt-decode";
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { fetchCurrentUser } from "./actions/users";
import { userFetched } from "./actions/auth";
import { localeSet } from "./actions/locale";

addLocaleData(en);
addLocaleData(ru);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
if (localStorage.alhubLang){
  store.dispatch(localeSet(localStorage.alhubLang));
}
if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUser());
}else{
  store.dispatch(userFetched({loaded:true}));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
