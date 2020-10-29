import { combineReducers } from 'redux';
import app from './app';
import scriptValidation from './validationscript';
import dataPost from './post';

export default combineReducers({
  data: app,
  validation: scriptValidation,
  post: dataPost
})