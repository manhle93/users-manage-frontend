import request from "../utils/request";
export function getCategories(params) {
    return request({
        url: "lookups",
        method: "get",
        params,
    });
}

export function addCustomer(data) {
    return request({
        url: "addcustomer",
        method: "post",
        data,
    });
}

export function getCustomerInfo(params) {
    return request({
        url: "addcustomerinfo",
        method: "get",
        params,
    });
}

export function editCustomerInfo(data) {
    return request({
        url: "editcustomerinfo",
        method: "put",
        data,
    });
}
export function addComment(data) {
    return request({
        url: "addcomment",
        method: "post",
        data,
    });
}

export function countPrint(data) {
    return request({
        url: "countprint",
        method: "post",
        data,
    });
}

export function getComments(params) {
    return request({
        url: "getcomment",
        method: "get",
        params,
    });
}

export function getCustomers(params) {
    return request({
        url: "customers",
        method: "get",
        params,
    });
}

export function setSinged(data) {
    return request({
        url: "editsinged",
        method: "put",
        data,
    });
}

export function editComment(data) {
    return request({
        url: "editcomment",
        method: "put",
        data,
    });
}

export function deleteComment(data) {
    return request({
        url: "deletecomment",
        method: "put",
        data,
    });
}

export function importCustomer(data) {
    return request({
        url: "importcustomers",
        method: "post",
        data,
    });
}