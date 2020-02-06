import { LOGIN, LOGOUT } from '../actions/auth';
import jwt_decode from 'jwt-decode';

const initialState = () => {
    const token = localStorage.logintoken;
    if (!token) {
        return null;
    }
    const {password, iat, exp, ...rest} = jwt_decode(token)
    return rest;
};

export default function(state = initialState(), action) {
    switch(action.type) {
        case LOGIN:
            return action.response;
        case LOGOUT:
            return action.response;
        default:
            return state;
    }
}
