import { REQUEST_REGISTER_USER, RECEIVE_REGISTER_USER, REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT, REQUEST_LOGIN_USING_TOKEN, RECEIVE_LOGIN_USING_TOKEN} from "../constants/ActionTypes";

const initialState = {
    isRegistering: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isLoggedIn: false,
    token: '',
    userId: 0,
    userName: ''
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
                isRegistering: false
            };

        case REQUEST_LOGIN:
            return {
                ...state,
                isLoggingIn: true
            };
        case RECEIVE_LOGIN:
            if (action.status === 'success') {
                return {
                    ...state,
                    isLoggingIn: false,
                    token: action.token,
                    userId: action.userId,
                    userName: action.userName,
                    isLoggedIn: true
                };
            } else {
                return {
                    ...state,
                    isLoggingIn: false,
                    token: '',
                    userId: 0,
                    userName: '',
                    isLoggedIn: false
                };
            }
        case REQUEST_LOGIN_USING_TOKEN:
            return {
                ...state,
                isLoggingIn: true
            };
        case RECEIVE_LOGIN_USING_TOKEN:
            if (action.status === 'success') {
                return {
                    ...state,
                    isLoggingIn: false,
                    userId: action.userId,
                    userName: action.userName,
                    isLoggedIn: true
                };
            } else {
                return {
                    ...state,
                    isLoggingIn: false,
                    userId: 0,
                    userName: '',
                    isLoggedIn: false
                };
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
         default:
            return state;
    }
}

