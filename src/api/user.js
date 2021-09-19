import request from "../utils/request";

export function login(data) {
  return request({
    url: "auth/login",
    method: "post",
    data,
  });
}

export function logout() {
  return request({
    url: "auth/logout",
    method: "post",
  });
}

export function me() {
  return request({
    url: "auth/me",
    method: "get",
  });
}

export function getMenuRole() {
  return request({
    url: "/menus",
    method: "get",
  });
}

export function changePassword(data) {
  return request({
    url: "/changepassword",
    method: "post",
    data
  });
}

export function listUser(params) {
  return request({
    url: "/users",
    method: "get",
    params
  });
}

export function verifyEmail(data) {
  return request({
    url: "auth/verifyemail",
    method: "post",
    data,
  });
}

export function activeUser(data) {
  return request({
    url: "/activeuser",
    method: "post",
    data
  });
}

export function updateUser(data) {
  return request({
    url: "/updateuser",
    method: "post",
    data
  });
}
export function updateMyUser(data) {
  return request({
    url: "updatemyuser",
    method: "post",
    data,
  });
}
export function createUser(data) {
  return request({
    url: "/adduser",
    method: "post",
    data
  });
}

export function uploadAvatar(data) {
  return request({
    url: "/uploadavatar",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}

export function uploadAvatarProfile(data) {
  return request({
    url: "/uploadavatarprofile",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data
  });
}


