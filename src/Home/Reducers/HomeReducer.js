import HomeActionTypes from '../Utility/HomeActionTypes';
export default (state = { "userAttachOrg": ""}, action) => {
    switch (action.type) {
        case HomeActionTypes.USER_ATTACH_ORG:
            return { ...state, "userAttachOrg": action.payload };
        case HomeActionTypes.USER_ATTACH_ORG:
            return { ...state, "userAttachOrg": action.payload };
        default:
            return state;
    }
};
