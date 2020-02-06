import axios from 'axios';

export const register = newOperator => {
    return axios.post('operator/register', {
        code: newOperator.code,
        name: newOperator.name,
        role: newOperator.role,
        password: newOperator.password
    }).then(response => response);
}

export const loginnih = operator => {
    return axios.post('operator/login', {
        code: operator.code,
        password: operator.password
    }).then(response => {
        localStorage.setItem('logintoken', response.data.token);
        return response;
    }).catch(err => err.response);
}
