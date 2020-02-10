import { GET_OPERATOR } from '../actions/operator';

export default function(state = [], action) {
    switch(action.type) {
        case GET_OPERATOR:
            return action.response;
        default:
            return state;
    }
}
