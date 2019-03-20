import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER, REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT } from '../constants/ActionTypes'
import UsersAPI from '../api/users';

// ユーザ登録
const requestRegister = () => {
    return {
        type: REQUEST_REGISTER_USER
    };
};
const receiveRegister = () => {
    return {
        type: RECEIVE_REGISTER_USER,
        status: 'success'
    };
};
const errorRegister = (err) => {
    return {
        type: RECEIVE_REGISTER_USER,
        status: 'error',
        error: err
    };
};
export const registerUser = (userName, password) => {
    return async (dispatch) => {
        dispatch(requestRegister());
        return UsersAPI.registerUser(userName, password)
        .then(
            () => dispatch(receiveRegister())
        )
        .catch(
            (err) => dispatch(errorRegister(err))
        );
    };
};

// ログイン
const requestLogin = () => {
    return {
        type: REQUEST_LOGIN
    };
};
const receiveLogin = (response) => {
    return {
        type: RECEIVE_LOGIN,
        status: 'success',
        token: response.data.access_token
    };
};
const errorLogin = (err) => {
    return {
        type: RECEIVE_LOGIN,
        status: 'error',
        error: err
    }
};
export const login = (userName, password) => {
    return async (dispatch) => {
        dispatch(requestLogin());
        return UsersAPI.login(userName, password)
        .then(
            (res) => dispatch(receiveLogin(res))
        )
        .catch(
            (err) => dispatch(errorLogin(err))
        );
    };
};

// ログアウト
export const logout = () => {
    localStorage.setItem('token', '');
    return {
        type: LOGOUT
    };
};