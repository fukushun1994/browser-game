import { apiBase, apiWithToken } from './base'

export default {
    registerUser: (userName, password) => {
        return apiBase.post('/users', {
            user_name: userName,
            password: password
        })
    },
    login: (userName, password) => {
        return apiBase.post('/login', {
            user_name: userName,
            password: password
        });
    },
    loginUsingToken: () => {
        return apiWithToken.get('/login');
    }
}