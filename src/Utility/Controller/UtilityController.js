import React from 'react';
import { get, post, put, del, patch } from '../Http';
import { changePasswordGet,userNotificationsGet,userNotificationsPatch,userChangePasswordApi,userDetailsGet, orgListingGet,showNotificationGet } from '../Model/UtilityModel';

import Config from '../Config';

export const changePassword = (data) => {
    return patch(`${Config.extendedUrl}users/changepassword`, data, { "Accesstoken": "", "Authorization": "" }).then((response) => {
        return changePasswordGet(response)
    })
};

export const notifications = (data) => {
    return get(`${Config.extendedUrl}notifications/list`, data).then((response) => {
        return userNotificationsGet(response)
    });
};

export const notificationsUserId = (data, type, id = "",) => {
    if (type == "patch") {
        return patch(`${Config.extendedUrl}notifications/job_read`, data).then((response) => {
            return userNotificationsPatch(response)
        });
    } 
};
export const userNewPasswordChange = (data) => {
    return patch(`${Config.extendedUrl}users/changepassword`, data,{passwordChange:true}).then((response) => {
        return userChangePasswordApi(response)
    });
    
};

export const user_Details = (id,data) => {
    return get(`${Config.extendedUrl}admin/users/${id}`, data).then((response) => {
        return userDetailsGet(response)
    });
};

export const orgListing = (data) => {
    return get(`${Config.extendedUrl}organisation`, data).then((response) => {
        return orgListingGet(response)
    });
};

export const showNotification = (data) => {
    return get(`${Config.extendedUrl}notification`, data).then((response) => {
        return showNotificationGet(response)
    });
};
