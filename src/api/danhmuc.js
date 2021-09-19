import request from "../utils/request";

export function getDanhMuc(params) {
  return request({
    url: "danhmuc",
    method: "get",
    params,
  });
}
export function getDanhMucCon(params) {
    return request({
      url: "danhmuccon",
      method: "get",
      params,
    });
  }

export function addDanhMuc(data) {
  return request({
    url: "danhmuc",
    method: "post",
    data,
  });
}
export function editDanhMuc(data) {
  return request({
    url: "danhmuc",
    method: "put",
    data,
  });
}