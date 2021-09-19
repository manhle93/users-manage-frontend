import request from "../utils/request";

export function addCa(data) {
  return request({
    url: "calamviec",
    method: "post",
    data,
  });
}
export function editCa(data) {
  return request({
    url: "calamviec",
    method: "put",
    data,
  });
}

export function getCa(params) {
  return request({
    url: "calamviec",
    method: "get",
    params,
  });
}