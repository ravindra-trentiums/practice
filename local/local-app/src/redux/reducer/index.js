import { combineReducers } from 'redux';

import { authentication } from './userReducer';

const rootReducer = combineReducers({
    authentication,
});

export default rootReducer;
