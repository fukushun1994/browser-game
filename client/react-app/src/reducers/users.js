import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER, REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT} from "../constants/ActionTypes";

const initialState = {
    isRegistering: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isLoggedIn: false,
    token: '',
    error: null
};

export default (state=initialState, action) => {
    switch(action.type) {
        case REQUEST_REGISTER_USER:
            return {
                ...state,
                isRegistering: true
            };
        case RECEIVE_REGISTER_USER:
            return {
                ...state,
                isRegistering: false,
                error: (action.status === 'success' ? null : action.error)
            };

        case REQUEST_LOGIN:
            return {
                ...state,
                isLoggingIn: true
            };
        case RECEIVE_LOGIN:
            return {
                ...state,
                isLoggingIn: false,
                token: (action.status === 'success' ? action.token : ''),
                isLoggedIn: action.status === 'success',
                error: (action.status === 'success' ? null : action.error)
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
         default:
            return state;
    }
}

