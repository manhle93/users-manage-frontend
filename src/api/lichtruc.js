import request from "../utils/request";

export function addLoaiTruc(data) {
  return request({
    url: "loaitruc",
    method: "post",
    data,
  });
}

export function editLoaiTruc(data) {
  return request({
    url: "loaitruc",
    method: "put",
    data,
  });
}

export function getLoaiTruc(params) {
  return request({
    url: "loaitruc",
    method: "get",
    params,
  });
}

export function addLichTruc(data) {
  return request({
    url: "lichtruc",
    method: "post",
    data,
  });
}

export function editLichTruc(data) {
  return request({
    url: "lichtruc",
    method: "put",
    data,
  });
}

export function getLichTruc(params) {
  return request({
    url: "lichtruc",
    method: "get",
    params,
  });
}