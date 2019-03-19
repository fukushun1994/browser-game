import apiBase from './base'

export default {
    registerUser: (user_name, password) => {
        return apiBase.post('/users', {
            user_name: user_name,
            password: password
        })
    }
}