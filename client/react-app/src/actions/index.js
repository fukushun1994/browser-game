import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER } from '../constants/ActionTypes'
import UsersAPI from '../api/users';

const requestRegister = () => {
    return {
        type: REQUEST_REGISTER_USER
    }
}
const receiveRegister = (response) => {
    return {
        type: RECEIVE_REGISTER_USER,
        status: 'success',
        userId: response.data.user_id
    }
}
const errorRegister = (err) => {
    return {
        type: RECEIVE_REGISTER_USER,
        status: 'error',
        error: err
    }
}

export const registerUser = (userName, password) => {
    return async (dispatch) => {
        dispatch(requestRegister());
        return UsersAPI.registerUser(userName, password)
        .then(
            (response) => dispatch(receiveRegister(response))
        )
        .catch(
            (err) => dispatch(errorRegister(err))
        );
    }
}