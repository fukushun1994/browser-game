import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER, REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT, REQUEST_LOGIN_USING_TOKEN, RECEIVE_LOGIN_USING_TOKEN } from '../constants/ActionTypes'
import UsersAPI from '../api/users';

// ユーザ登録
const requestRegister = () => {
    return {
        type: REQUEST_REGISTER_USER
    };
};
const receiveRegister = (response) => {
    return {
        type: RECEIVE_REGISTER_USER,
        status: 'success',
        userId: response.data.user_id,
        userName: response.data.user_name,
    };
};
const errorRegister = (error) => {
    return {
        type: RECEIVE_REGISTER_USER,
        status: 'error',
    };
};
export const registerUser = (userName, password) => {
    return async (dispatch) => {
        dispatch(requestRegister());
        try {
            const response = await UsersAPI.registerUser(userName, password);
            dispatch(receiveRegister(response));
            return Promise.resolve(response);
        } catch (error) {
            alert('ユーザ登録に失敗しました');
            console.log(error);
            dispatch(errorRegister(error));
            return Promise.reject(error);
        }
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
        token: response.data.token.access_token,
        userId: response.data.user.user_id,
        userName: response.data.user.user_name,
    };
};
const errorLogin = (err) => {
    return {
        type: RECEIVE_LOGIN,
        status: 'error'
    }
};
export const login = (userName, password) => {
    return async (dispatch) => {
        dispatch(requestLogin());
        try {
            const response = await UsersAPI.login(userName, password);
            localStorage.setItem('token', response.data.token.access_token);
            dispatch(receiveLogin(response));
            return Promise.resolve(response);
        } catch (error) {
            alert('ログインに失敗しました');
            console.log(error);
            dispatch(errorLogin(error));
            return Promise.reject(error);
        }
    };
};

const requestLoginUsingToken = () => {
    return {
        type: REQUEST_LOGIN_USING_TOKEN
    };
};
const receiveLoginUsingToken = (response) => {
    return {
        type: RECEIVE_LOGIN_USING_TOKEN,
        status: 'success',
        userId: response.data.user_id,
        userName: response.data.user_name
    };
};
const errorLoginUsingToken = (error) => {
    return {
        type: RECEIVE_LOGIN_USING_TOKEN,
        status: 'error'
    }
}
// トークンのverify
export const loginUsingToken = () => {
    return async (dispatch) => {
        dispatch(requestLoginUsingToken());
        try {
            const response = await UsersAPI.loginUsingToken();
            dispatch(receiveLoginUsingToken(response));
            return Promise.resolve(response);
        } catch (error) {
            console.log(error);
            dispatch(errorLoginUsingToken(error));
            return Promise.reject(error);
        }
    }
}

// ログアウト
export const logout = () => {
    localStorage.setItem('token', '');
    return {
        type: LOGOUT
    };
};