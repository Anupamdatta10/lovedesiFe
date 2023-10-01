import LoginActionTypes from '../Utility/LoginActionTypes';
export default (state = { "token": "", "accessToken": "", "refreshToken": "", "expiresIn": { "loggedInTime": "", "expiryTime": "", "expiryInterval": "" }, "userCredentials": {}, "version": [] }, action) => {
    switch (action.type) {
        case LoginActionTypes.SET_TOKEN:
            return { ...state, "token": action.payload };
        case LoginActionTypes.SET_ACCESS_TOKEN:
            return { ...state, "accessToken": action.payload };
        case LoginActionTypes.SET_TOKEN_EXPIRE_TIME:
            return { ...state, "expiresIn": action.payload };
        case LoginActionTypes.SET_REFRESH_TOKEN:
            return { ...state, "refreshToken": action.payload };
        case LoginActionTypes.SET_USER_CREDENTIALS:
            return { ...state, "userCredentials": action.payload };
        case LoginActionTypes.SET_VERSION:
            return { ...state, "version": action.payload };
        case LoginActionTypes.LOGOUT:
            return action.payload;
        default:
            return state;
    }
};
