import {combineReducers} from 'redux';
import userReducer from './userReducer';
import booksReducer from './booksReducer';
import activeBookReducer from './activeBookReducer';

export default combineReducers({
  userReducer,
  booksReducer,
  activeBookReducer,
});
