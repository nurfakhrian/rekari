import { LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
    isLogedIn: false,
    dataLogin: {}
};

export default function(state = initialState, action) {
    // console.log('reducer', state, action);
    switch(action.type) {
        case LOGIN:
            return {
                isLogedIn: true,
                dataLogin: {
                    code: 'ucing',
                    name: 'hirzi'
                }
            };
        case LOGOUT:
            return {
                isLogedIn: false,
                dataLogin: {}
            };
        default:
            return state;
    }
}