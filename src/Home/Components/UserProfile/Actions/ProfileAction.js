import ProfileActionTypes from '../Utility/ProfileActionTypes';
export const setOrganizationDetails = (value) => async (dispatch) => {
    dispatch({
        type: ProfileActionTypes.USER_ATTACH_ORG,
        payload: value
    });
}
