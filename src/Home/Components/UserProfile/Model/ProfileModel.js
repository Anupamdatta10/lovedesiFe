export const userDetailsGet = (userData) => {
    // console.log("userData===========", userData);
    //user details section
    let resData = {};
    let data = [];
    if (userData.data.success) {
        let userDetailsTempHash = {};
        userDetailsTempHash.user_details = {};

        let userDetailsApiResData = userData.data.data.length > 0 ? userData.data.data[0] : [];
        userDetailsTempHash.user_details.active = userDetailsApiResData.hasOwnProperty('active') && userDetailsApiResData.active ? userDetailsApiResData.active : "";
        userDetailsTempHash.user_details.contact_number = userDetailsApiResData.hasOwnProperty('contact_number') && userDetailsApiResData.contact_number ? userDetailsApiResData.contact_number : "";
        userDetailsTempHash.user_details.email = userDetailsApiResData.hasOwnProperty('email') && userDetailsApiResData.email ? userDetailsApiResData.email : "";
        userDetailsTempHash.user_details.first_name = userDetailsApiResData.hasOwnProperty('first_name') && userDetailsApiResData.first_name ? userDetailsApiResData.first_name : "";
        userDetailsTempHash.user_details.id = userDetailsApiResData.hasOwnProperty('id') && userDetailsApiResData.id ? userDetailsApiResData.id : "";
        userDetailsTempHash.user_details.last_name = userDetailsApiResData.hasOwnProperty('last_name') && userDetailsApiResData.last_name ? userDetailsApiResData.last_name : "";
        userDetailsTempHash.user_details.profile_img = userDetailsApiResData.hasOwnProperty('profile_img') && userDetailsApiResData.profile_img ? userDetailsApiResData.profile_img : {};
        userDetailsTempHash.user_details.org_id = userDetailsApiResData.hasOwnProperty('UserOrgRelation') && userDetailsApiResData.UserOrgRelation.length > 0 && userDetailsApiResData.UserOrgRelation[0].hasOwnProperty('org_id') ? userDetailsApiResData.UserOrgRelation[0].org_id : "";
        //console.log("userDetailsApiResData===========",userDetailsTempHash);

        data.push(userDetailsTempHash);
        resData = {
            "success": userData.data.success,
            "total": userData.data.total,
            "data": data
        }
    } else {
        resData = {
            "success": false,
            "message": 'Something went wrong'
        }
    }

    return resData;
}

export const userDeleteGet = (userDeleteData) => {
    return userDeleteData.data
}

export const resetPasswordApi = (data) => {
    return data.data
}

export const usersGet = (usersData) => {
    return usersData.data
}

export const currentUser = (currentUserData) => {
    let response = currentUserData.data;
    //console.log("currentUser response ===============>",response)
    let currentUserResData = {};
    if (response) {
        if (response.success) {
            currentUserResData = {
                "success": response.success,
                "data": {
                    "id": response.data.id,
                    "is_leave_validator": response.data.id == 1 ? true : response.data.is_leave_validator,
                    "is_trainer": response.data.is_trainer,
                    "user_details": {
                        "first_name": response.data.user_details.first_name,
                        "last_name": response.data.user_details.last_name,
                        "user_email": response.data.user_details.user_email,
                        "active": response.data.user_details.active,
                        "profile_img_url": response.data.user_details.profile_img,
                        "role_id": response.data.user_details.role_id,
                        "role_name": response.data.user_details.role_name,
                        "contact_number": response.data.user_details.contact_number,
                        "org_id": response.data.user_details.org_id,
                        "org_name": response.data.user_details.org_name,
                        "org_logo": response.data.user_details.org_logo,
                        "marketed_by_logo": response.data.user_details.marketed_by_logo,
                        "marketed_by_name": response.data.user_details.marketed_by_name,
                        "marketed_by_url": response.data.user_details.marketed_by_url,
                        "secret_key": response.data.user_details.secret_key,
                        "inbound_url": response.data.user_details.inbound_url,
                        "version": response.data.user_details.version,
                        "version_id": response.data.user_details.version_id,
                        "version_description": response.data.user_details.version_description
                    }
                }
            }
        } else {
            currentUserResData = {
                "success": response.success,
                "message": response.message
            }
        }
    }
    return currentUserResData;
}