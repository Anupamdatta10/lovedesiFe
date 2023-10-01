import { combineReducers } from 'redux';
import mainReducerData from './MainReducers';
import LoginReducer from '../Login/Reducers/LoginReducer';
import HomeReducer from '../Home/Reducers/HomeReducer';
export default combineReducers({
    mainReducerData,
    LoginReducer,
    HomeReducer
})