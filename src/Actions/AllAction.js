import AllActionTypes from '../Utility/AllActionTypes';
export const loaderStateTrue = () => async (dispatch) => {

    dispatch({
        type: AllActionTypes.LOADER_STATE_TRUE,
        payload: true
    });
}

export const loaderStateFalse = () => async (dispatch) => {

    dispatch({
        type: AllActionTypes.LOADER_STATE_FALSE,
        payload: false
    });
}


export const handleLeft = (value) => async (dispatch) => {
    dispatch({
        type: AllActionTypes.HANDLE_LEFT,
        payload: value
    });
};

export const handleActiveLink = (path, active_toggle) => async (dispatch) => {
    let data = {
        activeClass: path,
        accName: active_toggle
    };
    dispatch({
        type: AllActionTypes.ACTIVE_LINK,
        payload: data
    });
};

export const roleWisePermission = (value) => async (dispatch) => {
    dispatch({
        type: AllActionTypes.ROLE_PERMISSION,
        payload: value
    });
};

export const connectToWebsocket = (email,id) => async (dispatch, getState, api) => {  
    
    if ("WebSocket" in window) {
        //console.log("WebSocket is supported by your Browser!");
        // connect to web socket production
        //var ws = await new WebSocket(`wss://o0586ke9lk.execute-api.eu-west-1.amazonaws.com/production?userid=${userCredentials.email}&targetuserId=${testjsonData.loginId}`); 
        //dev
       var ws = await new WebSocket(`wss://860lo4o5jd.execute-api.eu-west-1.amazonaws.com/dev`);
       //var ws = await new WebSocket(`wss://uxq7jjteif.execute-api.eu-west-1.amazonaws.com/dev`);
    } else {
        alert("WebSocket NOT supported by your Browser!");
    }
    dispatch({
        type: AllActionTypes.CONNECT_DISCONNECT_TO_WEBSOCKET,
        payload: ws
    });
};
export const disconnectToWebsocket = (ws) => async (dispatch, getState, api) => {
    await ws.close();
    dispatch({
        type: AllActionTypes.CONNECT_DISCONNECT_TO_WEBSOCKET,
        payload: {}
    });
};
export const lockprocess = (value) => async (dispatch) => {
    dispatch({
        type: AllActionTypes.LOCK_FLAG,
        payload: value
    });
};
export const planningEditable = (value) => async (dispatch) => {
    dispatch({
        type: AllActionTypes.PLANNING_EDITABLE_BEFORE_CURRENT_DAY,
        payload: value
    });
};