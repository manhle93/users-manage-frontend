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