import React from 'react';
import { get, post, put, del } from '../../Utility/Http';
import { login, currentUser, forcePasswordChangeGet, forgotPasswordGet, changePasswordGet, rolePermissionApi, getVersionListGet } from '../Model/LoginModel';
import Config from '../../Utility/Config';

export const loginGetApi = (data) => {
    return post(`${Config.extendedUrl}users/login`, data, null).then((response) => {
        return login(response)
    });
};
export const getCurrentUser = () => {
    return get(`${Config.extendedUrl}users/currentuser`).then((response) => {
        return currentUser(response)
    })
};
export const rolePermissionGetApi = (data) => {
    return get(`${Config.extendedUrl}generic/roles_permissions`, data).then((response) => {
        return rolePermissionApi(response)
    })
};

export const forcePasswordChange = (data, headers) => {
    return post(`${Config.extendedUrl}users/userforcepasswordchange`, data, headers).then((response) => {
        return forcePasswordChangeGet(response)
    })
};
export const forgotPassword = (data) => {
    return put(`${Config.extendedUrl}users/forgotpassword`, data, null).then((response) => {
        return forgotPasswordGet(response)
    })
};
export const changePassword = (data) => {
    return put(`${Config.extendedUrl}users/confirmforgotpassword`, data, null).then((response) => {
        return changePasswordGet(response)
    })
};
export const getVersionList = (data) => {
    return get(`${Config.extendedUrl}version`, data).then((response) => {
        return getVersionListGet(response)
    })
};
