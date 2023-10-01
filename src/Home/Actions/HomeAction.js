import HomeActionTypes from '../Utility/HomeActionTypes';
export const setOrganizationDetails = (value) => async (dispatch) => {
    dispatch({
        type: HomeActionTypes.USER_ATTACH_ORG,
        payload: value
    });
}

