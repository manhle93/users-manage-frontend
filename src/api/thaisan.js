import request from "../utils/request";

export function getList(params) {
  return request({
    url: "thaisan",
    method: "get",
    params,
  });
}

export function addLichNghi(data) {
  return request({
    url: "thaisan",
    method: "post",
    data,
  });
}

export function editLichNghi(data) {
  return request({
    url: "thaisan",
    method: "put",
    data,
  });
}

export function xoaLichNghi(data) {
    return request({
      url: "xoanghithaisan",
      method: "put",
      data,
    });
  }
