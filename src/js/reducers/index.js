import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import reducers
import file from './file';

// combine reducers
const rootReducer = combineReducers({
  file,
  routing: routerReducer
});

export default rootReducer;
