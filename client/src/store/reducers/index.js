import { combineReducers } from 'redux';
import auth from './auth';
import operator from './operator';

export default combineReducers({
    auth,
    operator
});