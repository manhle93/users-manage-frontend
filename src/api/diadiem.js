import request from "../utils/request";

export function addDiaDiem(data) {
  return request({
    url: "diadiem",
    method: "post",
    data,
  });
}
export function editDiaDiem(data) {
  return request({
    url: "diadiem",
    method: "put",
    data,
  });
}

export function getDiaDiem(params) {
  return request({
    url: "diadiem",
    method: "get",
    params,
  });
}

export function addDiaDiemNhanVien(data) {
  return request({
    url: "diadiemnhanvien",
    method: "post",
    data,
  });
}
export function getDiaDiemNhanVien(params) {
  return request({
    url: "diadiemnhanvien",
    method: "get",
    params,
  });
}