import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER } from "../constants/ActionTypes";

const initialState = {
    isRegistering: false,
    isLoggingIn: false,
    isLoggingOut: false,
};

export default (state=initialState, action) => {
    switch(action.type) {
        case REQUEST_REGISTER_USER:
            return {
                ...state,
                isRegistering: true
            }
        case RECEIVE_REGISTER_USER:
            return {
                ...state,
                isRegistering: false
            }
        default:
            return state
    }
}

