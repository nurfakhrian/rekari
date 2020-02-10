import axios from 'axios';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = user => dispatch => {
    return axios.post('http://localhost:3028/operator/login', user)
        .then(response => {
            localStorage.setItem('logintoken', response.data.token);
            dispatch({ type: LOGIN, response: response.data.message });
            return response.data.message;
        })
        .catch(err => err.response.data.message);
}

export const logout = () => {
    localStorage.removeItem('logintoken');
    return { type: LOGOUT, response: null };
};
