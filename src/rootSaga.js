import { takeLatest } from "redux-saga/effects";

import { CREATE_USER_REQUEST } from './types';
import { createUserSaga } from "./sagars/usersSagas";

export default function* rootSaga(){
    yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}