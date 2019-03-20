import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER } from "../constants/ActionTypes";

const initialState = {
    isRegistering: false,
    isLoggingIn: false,
    isLoggingOut: false,
    user_id: 0,
    error: null
};

export default (state=initialState, action) => {
    switch(action.type) {
        case REQUEST_REGISTER_USER:
            return {
                ...state,
                isRegistering: true
            }
        case RECEIVE_REGISTER_USER:
            if (action.status === 'success') {
                return {
                    ...state,
                    isRegistering: false,
                    userId: action.userId,
                    error: null
                }
            } else if (action.status === 'error'){
                return {
                    ...state,
                    isRegistering: false,
                    error: action.error
                }
            }
         default:
            return state
    }
}

