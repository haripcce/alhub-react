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
import { fetchCurrentUserRequest, fetchCurrentUserSuccess } from "./actions/users";
import { localeSet } from "./actions/locale";
import createSagaMiddleware from 'redux-saga'
import  rootSaga  from "./rootSaga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

addLocaleData(en);
addLocaleData(ru);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);

sagaMiddleware.run(rootSaga);
if (localStorage.alhubLang){
  store.dispatch(localeSet(localStorage.alhubLang));
}
if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUserRequest());
}else{
  store.dispatch(fetchCurrentUserSuccess({}));
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
