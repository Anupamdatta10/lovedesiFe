import ProfileActionTypes from '../Utility/ProfileActionTypes';
export default (state = { "userAttachOrg": ""}, action) => {
    switch (action.type) {
        case ProfileActionTypes.USER_ATTACH_ORG:
            return { ...state, "userAttachOrg": action.payload };
        default:
            return state;
    }
};
