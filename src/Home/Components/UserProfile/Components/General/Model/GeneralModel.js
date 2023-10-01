export const userDetailsGet = (userData) => {
    //user details section
    let resData = {};
    let data = [];
    if (userData.data.success) {
        let userDetailsTempHash = {};
        userDetailsTempHash.user_details = {};

        let userDetailsApiResData = userData.data.data.length > 0 ? userData.data.data[0] : [];
        userDetailsTempHash.user_details.contact_number = userDetailsApiResData.hasOwnProperty('contact_number') && userDetailsApiResData.contact_number ? userDetailsApiResData.contact_number : "";
        userDetailsTempHash.user_details.email = userDetailsApiResData.hasOwnProperty('email') && userDetailsApiResData.email ? userDetailsApiResData.email : "";
        userDetailsTempHash.user_details.first_name = userDetailsApiResData.hasOwnProperty('first_name') && userDetailsApiResData.first_name ? userDetailsApiResData.first_name : "";
        userDetailsTempHash.user_details.id = userDetailsApiResData.hasOwnProperty('id') && userDetailsApiResData.id ? userDetailsApiResData.id : "";
        userDetailsTempHash.user_details.last_name = userDetailsApiResData.hasOwnProperty('last_name') && userDetailsApiResData.last_name ? userDetailsApiResData.last_name : "";
        userDetailsTempHash.user_details.profile_img = userDetailsApiResData.hasOwnProperty('profile_img') && userDetailsApiResData.profile_img ? userDetailsApiResData.profile_img : {};
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

export const userTrainerAndCoachUpdateGet = (data) => {
        return data.data
}

export const organisationGet = (data) => {    
    return data.data;
}

export const userContactNumberUpdateGet = (data) => {    
    return data.data;
}