import request from "../utils/request";
export function getNhom(params) {
  return request({
    url: "nhoms",
    method: "get",
    params,
  });
}

export function addNhom(data) {
  return request({
    url: "nhoms",
    method: "post",
    data,
  });
}

export function editNhom(data) {
  return request({
    url: "nhom",
    method: "put",
    data,
  });
}

export function getThanhVien(params) {
  return request({
    url: "thanhvien",
    method: "get",
    params,
  });
}

export function addThanhVien(data) {
  return request({
    url: "thanhvien",
    method: "post",
    data,
  });
}

export function xoaThanhVien(data) {
  return request({
    url: "thanhvien",
    method: "delete",
    data,
  });
}

export function getAllPeople() {
  return request({
    url: "allpeople",
    method: "get",
  });
}