import { combineReducers } from 'redux';

import todo from './todoReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  toastr: toastrReducer,
  todo
});
