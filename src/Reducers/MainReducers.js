import AllActionTypes from '../Utility/AllActionTypes';

export default (state = { "loaderState": false, "leftbar": false, "activeLink": { 'accName': "", 'activeClass': "", 'lockFlag': true, 'planningEditableDay': 0 },roleWisePermission:{},"websocket":{} }, action) => {
    switch (action.type) {
        case AllActionTypes.LOADER_STATE_TRUE:
            return { ...state, "loaderState": action.payload };
        case AllActionTypes.LOADER_STATE_FALSE:
            return { ...state, "loaderState": action.payload };
        case AllActionTypes.HANDLE_LEFT:
            return { ...state, "leftbar": action.payload };
        case AllActionTypes.ACTIVE_LINK:
            return { ...state, "activeLink": action.payload };
        case AllActionTypes.ROLE_PERMISSION:
            return { ...state, "roleWisePermission": action.payload };
        case AllActionTypes.CONNECT_DISCONNECT_TO_WEBSOCKET:
            return { ...state, "websocket": action.payload };
        case AllActionTypes.LOCK_FLAG:
            return { ...state, "lockFlag": action.payload };
        case AllActionTypes.PLANNING_EDITABLE_BEFORE_CURRENT_DAY:
            return { ...state, "planningEditableDay": action.payload };
       
		case AllActionTypes.CLEAR_DATA:
            return action.payload;					  
        default:
            return state;
    }
};
