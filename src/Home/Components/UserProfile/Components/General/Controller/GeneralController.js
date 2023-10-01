import React from 'react';
import { get, post, put, del, patch } from '../../../../../../Utility/Http';
import { userDetailsGet, userTrainerAndCoachUpdateGet, organisationGet, userContactNumberUpdateGet } from '../Model/GeneralModel';
import Config from '../../../../../../Utility/Config';


export const user_Details = (id) => {
    return get(`${Config.extendedUrl}admin/users/${id}`).then((response) => {
        return userDetailsGet(response)
    });
};
export const userTrainerAndCoachUpdate = (data = "", type, id,) => {
    return patch(`${Config.extendedUrl}admin/users/${id}`, data).then((response) => {
        return userTrainerAndCoachUpdateGet(response)
    });
};

export const organisation = (data) => {
    return get(`${Config.extendedUrl}organisation`, data).then((response) => {
        return organisationGet(response)
    });
};

export const userContactNumberUpdate = (data, type, id,) => {
    return patch(`${Config.extendedUrl}admin/users/${id}`, data).then((response) => {
        return userContactNumberUpdateGet(response)
    });
};