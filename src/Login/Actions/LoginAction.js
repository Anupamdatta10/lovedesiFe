import LoginActionTypes from '../Utility/LoginActionTypes'
import AllActionTypes from '../../Utility/AllActionTypes'
import { get, post, put, del } from '../../Utility/Http';
import Config from '../../Utility/Config';

export const setToken = (token, accessToken, expiresIn, refreshToken) => async (dispatch) => {

    dispatch({
        type: LoginActionTypes.SET_TOKEN,
        payload: token
    });
    dispatch({
        type: LoginActionTypes.SET_ACCESS_TOKEN,
        payload: accessToken
    });
    dispatch({
        type: LoginActionTypes.SET_TOKEN_EXPIRE_TIME,
        payload: expiresIn
    });
    dispatch({
        type: LoginActionTypes.SET_REFRESH_TOKEN,
        payload: refreshToken
    });
    
}


export const logOutApp = (accessToken, token) => async (dispatch) => {
    del(`${Config.extendedUrl}users/signout`, "", { "Accesstoken": "", "Authorization": "" }).then((response) => {

    })
    dispatch({
        type: LoginActionTypes.LOGOUT,
        payload: { "token": "", "accessToken": "", "refreshToken": "", "expiresIn": { "loggedInTime": "", "expiryTime": "", "expiryInterval": "" }, "userCredentials": {}, "version": [], "roleWisePermission": {} }
    });
    dispatch({
        type: AllActionTypes.CLEAR_DATA,
        payload: { "loaderState": false, "leftbar": false, "activeLink": { 'accName': "", 'activeClass': "" }, "roleWisePermission": {} }
    });
}

export const setUserCredentials = (value) => async (dispatch) => {
    dispatch({
        type: LoginActionTypes.SET_USER_CREDENTIALS,
        payload: value
    });
    
}

export const setVersionList = (value) => async (dispatch) => {
    dispatch({
        type: LoginActionTypes.SET_VERSION,
        payload: value
    });
    
}
