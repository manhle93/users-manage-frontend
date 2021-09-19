import request from "../utils/request";

export function getNhomTo(params) {
  return request({
    url: "nhomto",
    method: "get",
    params,
  });
}
export function getNhomToTrucThuoc(params) {
  return request({
    url: "nhomtotructhuoc",
    method: "get",
    params,
  });
}
export function addNhomTo(data) {
  return request({
    url: "nhomto",
    method: "post",
    data,
  });
}
export function editNhomTo(data) {
  return request({
    url: "nhomto",
    method: "put",
    data,
  });
}