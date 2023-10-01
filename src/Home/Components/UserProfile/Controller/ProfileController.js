import React from 'react';
import { get, post, put, del, patch } from '../../../../Utility/Http';
import { userDetailsGet, userDeleteGet, resetPasswordApi, usersGet, currentUser } from '../Model/ProfileModel';
import Config from '../../../../Utility/Config';

export const user_Details = (id) => {
    return get(`${Config.extendedUrl}admin/users/${id}`).then((response) => {
        return userDetailsGet(response)
    });
};

export const userDelete = (data) => {
    return del(`${Config.extendedUrl}admin/users`, data).then((response) => {
        return userDeleteGet(response)
    });
};

export const resetPassword = (data) => {
    return patch(`${Config.extendedUrl}admin/resetpassword`, data).then((response) => {
        return resetPasswordApi(response)
    });
};

export const users = (data, id) => {
    return patch(`${Config.extendedUrl}admin/users/${id}`, data).then((response) => {
        return usersGet(response)
    });
};

export const getCurrentUser = () => {
    return get(`${Config.extendedUrl}users/currentuser`).then((response) => {
        return currentUser(response)
    })
};