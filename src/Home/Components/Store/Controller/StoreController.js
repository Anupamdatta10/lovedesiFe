import React from 'react';
import { get, post, put, del, patch } from '../../../../Utility/Http';
import { workerListingGet, workerAddGet, individualUserApiGet, userDetailsGet, userRelationDetailsGet, orgListingGet } from '../Model/StoreModel';
import Config from '../../../../Utility/Config';

export const workerListing = (data) => {
    return get(`${Config.extendedUrl}admin/users/list`, data).then((response) => {
        return workerListingGet(response)
    });
};

export const individualUser = (id, data) => {
    return get(`${Config.extendedUrl}admin/users/list/${id}`, data).then((response) => {
        return individualUserApiGet(response)
    });
};


export const workerAdd = (data, type) => {
    return post(`${Config.extendedUrl}admin/users`, data).then((response) => {
        return workerAddGet(response)
    });
};

export const user_Details = (id, data) => {
    return get(`${Config.extendedUrl}admin/users/${id}`, data).then((response) => {
        return userDetailsGet(response)
    });
};


export const userRelationalDetailsAdd = (data, type, id = "") => {
    if (type == "post") {
        return post(`${Config.extendedUrl}org_user_relations`, data).then((response) => {
            return userRelationDetailsGet(response)
        });
    } else if (type == "patch") {
        return patch(`${Config.extendedUrl}org_user_relations/${id}`, data).then((response) => {
            return userRelationDetailsGet(response)
        });
    }
};

