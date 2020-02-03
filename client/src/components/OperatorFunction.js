import axios from 'axios';

export const register = newOperator => {
    return axios.post('operator/register', {
        code: newOperator.code,
        name: newOperator.name,
        password: newOperator.password
    }).then(response => console.log(response));
}

export const login = operator => {
    return axios.post('operator/login', {
        code: operator.code,
        password: operator.password
    }).then(response => {
        localStorage.setItem('logintoken', response.data.token);
        return response.data;
    }).catch(err => console.log(err));
}
