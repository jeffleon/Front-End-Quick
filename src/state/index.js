import { combineReducers } from 'redux';
import app from './app';

/* types of actions */
export default combineReducers({
  data: app
})