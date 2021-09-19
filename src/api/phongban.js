import request from "../utils/request";

export function getPhongBan(params) {
  return request({
    url: "phongban",
    method: "get",
    params,
  });
}

export function addPhongBan(data) {
  return request({
    url: "phongban",
    method: "post",
    data,
  });
}
export function editPhongBan(data) {
  return request({
    url: "phongban",
    method: "put",
    data,
  });
}