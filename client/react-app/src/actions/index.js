import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER } from '../constants/ActionTypes'
import UsersAPI from '../api/users';

const requestRegister = () => {
    return {
        type: REQUEST_REGISTER_USER
    }
}
const receiveRegister = () => {
    return {
        type: RECEIVE_REGISTER_USER
    }
}
export const registerUser = (userName, password) => {
    return async (dispatch) => {
        dispatch(requestRegister());
        const response = await UsersAPI.registerUser(userName, password).catch((err) => console.log(err));
        dispatch(receiveRegister());
    }
}